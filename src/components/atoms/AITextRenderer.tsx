import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

export type AITextRenderMode = 'character' | 'word';

export interface AITextRendererProps {
  /** Full text content. For streamed responses, pass the accumulated text and
   *  the renderer continues from where it left off without restarting. */
  text: string;
  /** Reveal character-by-character or word-by-word. */
  mode?: AITextRenderMode;
  /** Base delay in milliseconds between revealed units (jittered for a natural feel). */
  speed?: number;
  /** Show a blinking cursor while text is being rendered. */
  cursor?: boolean;
  /** Keep the cursor visible after the current text finishes, indicating more
   *  streamed content is expected. */
  streaming?: boolean;
  /** Smooth-scroll the nearest scrollable ancestor as new content appears. */
  autoScroll?: boolean;
  /** 'span' renders inline content; 'div' renders Markdown block content. */
  as?: 'span' | 'div';
  /** Number of trailing units that receive the fade-in treatment. */
  fadeUnits?: number;
  className?: string;
  onComplete?: () => void;
}

interface InlineAtom {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  href?: string;
}

type Block =
  | { type: 'paragraph'; atoms: InlineAtom[] }
  | { type: 'heading'; level: number; atoms: InlineAtom[] }
  | { type: 'list'; ordered: boolean; items: InlineAtom[][] }
  | { type: 'codeblock'; code: string; lang: string };

const FENCE_RE = /^```(\w*)\s*$/;
const HEADING_RE = /^(#{1,6})\s+(.*)$/;
const ULIST_RE = /^\s*[-*+]\s+(.*)$/;
const OLIST_RE = /^\s*\d+[.)]\s+(.*)$/;
const INLINE_RE =
  /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(\*[^*\n]+\*)|(\[[^\]\n]+\]\([^)\s\n]+\))/g;

function parseInline(source: string): InlineAtom[] {
  const atoms: InlineAtom[] = [];
  let last = 0;
  for (const match of source.matchAll(INLINE_RE)) {
    const index = match.index ?? 0;
    if (index > last) atoms.push({ text: source.slice(last, index) });
    const token = match[0];
    if (token.startsWith('`')) {
      atoms.push({ text: token.slice(1, -1), code: true });
    } else if (token.startsWith('**')) {
      atoms.push({ text: token.slice(2, -2), bold: true });
    } else if (token.startsWith('*')) {
      atoms.push({ text: token.slice(1, -1), italic: true });
    } else {
      const sep = token.indexOf('](');
      atoms.push({ text: token.slice(1, sep), href: token.slice(sep + 2, -1) });
    }
    last = index + token.length;
  }
  if (last < source.length) atoms.push({ text: source.slice(last) });
  return atoms;
}

function parseBlocks(source: string): Block[] {
  const lines = source.split('\n');
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ type: 'paragraph', atoms: parseInline(paragraph.join(' ')) });
    paragraph = [];
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const fence = line.match(FENCE_RE);
    if (fence) {
      flushParagraph();
      const lang = fence[1];
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !FENCE_RE.test(lines[i])) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1; // consume the closing fence (or run past the end)
      blocks.push({ type: 'codeblock', code: codeLines.join('\n'), lang });
      continue;
    }
    const heading = line.match(HEADING_RE);
    if (heading) {
      flushParagraph();
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        atoms: parseInline(heading[2]),
      });
      i += 1;
      continue;
    }
    const unordered = line.match(ULIST_RE);
    const ordered = line.match(OLIST_RE);
    if (unordered || ordered) {
      flushParagraph();
      const isOrdered = ordered !== null;
      const itemRe = isOrdered ? OLIST_RE : ULIST_RE;
      const items: InlineAtom[][] = [];
      while (i < lines.length) {
        const item = lines[i].match(itemRe);
        if (!item) break;
        items.push(parseInline(item[1]));
        i += 1;
      }
      blocks.push({ type: 'list', ordered: isOrdered, items });
      continue;
    }
    if (line.trim() === '') {
      flushParagraph();
      i += 1;
      continue;
    }
    paragraph.push(line.trim());
    i += 1;
  }
  flushParagraph();
  return blocks;
}

/** Split text into render units: whole words (with trailing whitespace) for
 *  word mode, single characters (surrogate-safe) for character mode. */
function splitUnits(text: string, mode: AITextRenderMode): string[] {
  if (mode === 'word') return text.match(/\S+\s*|\s+/g) ?? [];
  return Array.from(text);
}

function blockAtoms(block: Block): InlineAtom[][] {
  if (block.type === 'codeblock') {
    return [[{ text: block.code, code: true }]];
  }
  if (block.type === 'list') return block.items;
  return [block.atoms];
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {};
  }
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener?.('change', callback);
  return () => media.removeEventListener?.('change', callback);
}

function getReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

const getServerReducedMotion = () => false;

const Cursor: React.FC = () => (
  <span className="ai-text-cursor" aria-hidden="true" />
);

export const AITextRenderer: React.FC<AITextRendererProps> = ({
  text,
  mode = 'character',
  speed = 40,
  cursor = true,
  streaming = false,
  autoScroll = false,
  as = 'span',
  fadeUnits = 2,
  className = '',
  onComplete,
}) => {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  const blocks = useMemo<Block[]>(
    () =>
      as === 'span'
        ? [{ type: 'paragraph', atoms: parseInline(text) }]
        : parseBlocks(text),
    [text, as],
  );

  // Units per block -> per atom-group (list item) -> per atom.
  const blockUnits = useMemo(
    () =>
      blocks.map((block) =>
        blockAtoms(block).map((group) =>
          group.map((atom) => splitUnits(atom.text, mode)),
        ),
      ),
    [blocks, mode],
  );

  // Flattened units, used for total count and pacing decisions.
  const allUnits = useMemo(
    () =>
      blockUnits.flatMap((groups) =>
        groups.flatMap((atoms) => atoms.flatMap((units) => units)),
      ),
    [blockUnits],
  );
  const totalUnits = allUnits.length;

  const [visibleUnits, setVisibleUnits] = useState(0);

  // Streaming continuation: when the text grows by appending, keep the current
  // progress. Any other change (new message, truncation) restarts cleanly.
  const previousText = useRef(text);
  if (previousText.current !== text) {
    const appended = text.startsWith(previousText.current);
    previousText.current = text;
    if (!appended) setVisibleUnits(0);
  }

  const done = visibleUnits >= totalUnits;

  // Progressive reveal timer. Each tick schedules the next with slight jitter
  // and a longer pause after sentence-ending punctuation for a natural feel.
  useEffect(() => {
    if (reducedMotion || visibleUnits >= totalUnits) return;
    const unit = allUnits[visibleUnits] ?? '';
    let delay = speed * (0.6 + Math.random() * 0.8);
    if (/[.!?…]/.test(unit)) delay += speed * 4;
    else if (/[,;:]/.test(unit)) delay += speed * 1.5;
    const timer = window.setTimeout(
      () => setVisibleUnits((current) => current + 1),
      delay,
    );
    return () => window.clearTimeout(timer);
  }, [visibleUnits, totalUnits, allUnits, speed, reducedMotion]);

  // Fire onComplete once per fully rendered text; re-arms when streamed text
  // grows the unit count.
  const completedFor = useRef(0);
  useEffect(() => {
    if (done && totalUnits > 0 && completedFor.current !== totalUnits) {
      completedFor.current = totalUnits;
      onComplete?.();
    }
  }, [done, totalUnits, onComplete]);

  // Smooth-scroll the nearest scrollable ancestor as content grows.
  const containerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!autoScroll || done) return;
    let element = containerRef.current?.parentElement ?? null;
    while (element) {
      const style = window.getComputedStyle(element);
      if (
        /(auto|scroll)/.test(style.overflowY) &&
        element.scrollHeight > element.clientHeight
      ) {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
        return;
      }
      element = element.parentElement;
    }
  }, [visibleUnits, autoScroll, done, reducedMotion]);

  const budget = reducedMotion ? totalUnits : visibleUnits;
  const revealDone = budget >= totalUnits;
  const showCursor = cursor && (!revealDone || (streaming && !reducedMotion));

  // Render helpers -----------------------------------------------------------

  const renderMarked = (atom: InlineAtom, content: React.ReactNode, key: string) => {
    let node = content;
    if (atom.code) {
      node = (
        <code className="rounded bg-lavender-200 px-1 py-0.5 font-mono text-[0.85em]">
          {node}
        </code>
      );
    }
    if (atom.bold) node = <strong>{node}</strong>;
    if (atom.italic) node = <em>{node}</em>;
    if (atom.href) {
      node = (
        <a
          href={atom.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 underline underline-offset-2"
        >
          {node}
        </a>
      );
    }
    return <React.Fragment key={key}>{node}</React.Fragment>;
  };

  const renderAtomGroup = (
    atoms: InlineAtom[],
    atomUnits: string[][],
    keyPrefix: string,
    remaining: { value: number },
  ): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    atoms.forEach((atom, atomIndex) => {
      if (remaining.value <= 0) return;
      const units = atomUnits[atomIndex];
      const take = Math.min(remaining.value, units.length);
      remaining.value -= take;
      const isEdge = remaining.value === 0 && !revealDone;
      let content: React.ReactNode;
      if (isEdge) {
        const faded = Math.min(fadeUnits, take);
        const head = units.slice(0, take - faded).join('');
        const tail = units.slice(take - faded, take);
        content = (
          <>
            {head}
            {tail.map((unit, unitIndex) => (
              <span key={unitIndex} className="ai-text-fade">
                {unit}
              </span>
            ))}
          </>
        );
      } else {
        content = units.slice(0, take).join('');
      }
      nodes.push(renderMarked(atom, content, `${keyPrefix}-${atomIndex}`));
    });
    return nodes;
  };

  // Render ------------------------------------------------------------------

  const remaining = { value: budget };

  if (as === 'span') {
    // Inline mode: a single paragraph's atoms rendered directly, no block wrapper.
    return (
      <span
        ref={containerRef as React.Ref<HTMLSpanElement>}
        className={`ai-text-renderer break-words ${className}`}
      >
        {renderAtomGroup(
          blocks[0]?.type === 'paragraph' ? blocks[0].atoms : [],
          blockUnits[0]?.[0] ?? [],
          'inline',
          remaining,
        )}
        {showCursor ? <Cursor /> : null}
      </span>
    );
  }

  const blockNodes = blocks.map((block, blockIndex) => {
    const groups = blockAtoms(block);
    const groupUnits = blockUnits[blockIndex];
    const isLastBlock = blockIndex === blocks.length - 1;

    if (block.type === 'codeblock') {
      const units = groupUnits[0][0];
      const take = Math.min(remaining.value, units.length);
      remaining.value -= take;
      return (
        <pre
          key={blockIndex}
          className="mb-3 overflow-x-auto rounded-lg bg-dark-panel p-3 font-mono text-[0.85em] text-white whitespace-pre-wrap break-words last:mb-0"
        >
          <code>{units.slice(0, take).join('')}</code>
          {isLastBlock && showCursor ? <Cursor /> : null}
        </pre>
      );
    }

    const renderedGroups = groups.map((group, groupIndex) =>
      renderAtomGroup(group, groupUnits[groupIndex], `${blockIndex}-${groupIndex}`, remaining),
    );

    if (block.type === 'heading') {
      const Tag = `h${Math.min(Math.max(block.level, 1), 6)}` as
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6';
      return (
        <Tag key={blockIndex} className="mb-3 last:mb-0">
          {renderedGroups[0]}
          {isLastBlock && showCursor ? <Cursor /> : null}
        </Tag>
      );
    }
    if (block.type === 'list') {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag
          key={blockIndex}
          className={`mb-3 space-y-1 pl-6 last:mb-0 ${
            block.ordered ? 'list-decimal' : 'list-disc'
          }`}
        >
          {renderedGroups.map((itemNodes, itemIndex) => (
            <li key={itemIndex}>
              {itemNodes}
              {isLastBlock && showCursor && itemIndex === renderedGroups.length - 1 ? (
                <Cursor />
              ) : null}
            </li>
          ))}
        </ListTag>
      );
    }
    return (
      <p key={blockIndex} className="mb-3 break-words last:mb-0">
        {renderedGroups[0]}
        {isLastBlock && showCursor ? <Cursor /> : null}
      </p>
    );
  });

  return (
    <div
      ref={containerRef as React.Ref<HTMLDivElement>}
      className={`ai-text-renderer break-words ${className}`}
    >
      {blockNodes}
      {blocks.length === 0 && showCursor ? <Cursor /> : null}
    </div>
  );
};

AITextRenderer.displayName = 'AITextRenderer';
