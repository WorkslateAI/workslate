import React, { useState, useEffect } from 'react';
import { SearchTrigger } from '../components/atoms/SearchTrigger';
import { SearchDialog } from '../components/atoms/SearchDialog';

export const Docs: React.FC = () => {
  const [termFilter, setTermFilter] = useState<string>('all');
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy example');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [renderStage, setRenderStage] = useState(0);

  const handleFilterTerms = (category: string) => {
    setTermFilter(category);
  };

  const handleCopyCode = () => {
    const plain = `// Conceptual flow only — configure provider, signer and contract wrapper securely.
Web3j web3 = Web3j.build(new HttpService(rpcUrl));

// Submit a contract method through a generated / loaded wrapper.
TransactionReceipt receipt = tokenContract.transfer(recipient, amount).send();

// Verify execution; a mined transaction can still fail.
if (!receipt.isStatusOK()) {
  throw new IllegalStateException("On-chain execution failed");
}

String txHash = receipt.getTransactionHash();
// Production: consider async submission, confirmations/finality, duplicate events,
// reorg handling, key custody, gas and nonce coordination.`;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(plain).then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy example'), 1400);
      }).catch(() => {
        alert('Clipboard access is unavailable in this preview.');
      });
    }
  };

  // Keyboard shortcuts for search
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      // / to open search when no input is focused
      if (e.key === '/' && !isSearchOpen) {
        const activeElement = document.activeElement;
        const isInputFocused = activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;
        
        if (!isInputFocused) {
          e.preventDefault();
          setIsSearchOpen(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Progressive render: paint the hero + first section in the initial commit
  // (that's the LCP element), then mount the remaining sections over successive
  // idle tasks. Splitting this page's large render into smaller tasks keeps the
  // main thread free for paint and shrinks TBT.
  useEffect(() => {
    if (renderStage >= 2 || typeof window === 'undefined') return;
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(
        () => setRenderStage((s) => s + 1),
        { timeout: 600 },
      );
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setRenderStage((s) => s + 1), 0);
    return () => window.clearTimeout(id);
  }, [renderStage]);

  const terms = [
    { id: 'web3j', cat: 'workflow', title: 'Web3j', badge: 'Java SDK', desc: 'Java integration library for Ethereum JSON-RPC, ABI encoding, contract wrappers, transaction submission and event/log access.', code: 'Java → JSON-RPC → node' },
    { id: 'bpmn', cat: 'workflow', title: 'BPMN', badge: 'Process model', desc: 'Business Process Model and Notation: tasks, gateways, events, timers, message flows and error paths that describe a process.', code: 'Sequence · gateway · event' },
    { id: 'orchestration', cat: 'workflow', title: 'Orchestration', badge: 'Coordination', desc: 'A central process instance controls which step runs next, records progress and manages retries, waits and compensating actions.', code: 'Process instance' },
    { id: 'off-chain', cat: 'workflow', title: 'Off-chain', badge: 'External systems', desc: 'Work outside the blockchain, such as identity checks, pricing, banking APIs, databases or private business data.', code: 'API · database · worker' },
    { id: 'on-chain', cat: 'chain', title: 'On-chain', badge: 'Ledger', desc: 'Transactions, smart-contract execution, logs and state transitions recorded or validated by the blockchain protocol.', code: 'Transaction → state transition' },
    { id: 'evm', cat: 'chain', title: 'EVM', badge: 'Execution', desc: 'Ethereum Virtual Machine: deterministic execution environment for smart-contract bytecode, subject to gas and protocol rules.', code: 'Bytecode · gas · opcodes' },
    { id: 'consensus', cat: 'chain', title: 'Consensus', badge: 'Agreement', desc: 'Protocol by which network participants agree on block ordering and canonical chain history. Mechanisms differ by network: e.g. proof of stake or QBFT.', code: 'Ordering · validity · finality' },
    { id: 'state', cat: 'chain', title: 'State', badge: 'Current facts', desc: 'Current account balances, nonces, contract storage and code, as defined by a particular block. State changes through valid execution.', code: 'Account + contract state' },
    { id: 'storage', cat: 'chain', title: 'Storage', badge: 'Contract data', desc: 'Persistent smart-contract key/value slots. Distinct from memory (temporary during execution) and calldata (input data).', code: 'storage · memory · calldata' },
    { id: 'receipt', cat: 'chain', title: 'Transaction receipt', badge: 'Execution result', desc: 'Post-inclusion metadata such as status, gas used, block reference and emitted logs. A submitted hash alone does not prove success.', code: 'hash → receipt → verify status' },
    { id: 'p2p', cat: 'network', title: 'P2P network', badge: 'Communication', desc: 'Peer-to-peer communication between nodes to discover peers and exchange protocol messages, transactions and blocks.', code: 'Peers · gossip · discovery' },
    { id: 'node', cat: 'network', title: 'Node / validator', badge: 'Network role', desc: 'A node runs client software and validates or relays data. A validator has additional consensus duties where the network design requires it.', code: 'Execution client ≠ validator in every design' },
    { id: 'block', cat: 'chain', title: 'Block + finality', badge: 'Chain history', desc: 'A block groups ordered transactions. Finality is the protocol\'s assurance that a block will not be reverted under stated assumptions.', code: 'Inclusion ≠ immediate finality' },
    { id: 'idempotency', cat: 'workflow', title: 'Idempotency', badge: 'Reliability', desc: 'Repeated delivery or retry should not cause the same business effect twice. Use stable business IDs and on-chain replay protections.', code: 'Idempotency key · unique operation' },
    { id: 'saga', cat: 'workflow', title: 'Saga / compensation', badge: 'Recovery', desc: 'A sequence of local transactions with compensating business actions when later steps fail. Compensation is not a blockchain rollback.', code: 'Forward action ↔ compensation' },
    { id: 'event', cat: 'chain', title: 'Event / log', badge: 'Observability', desc: 'Smart contracts emit logs that applications can query or subscribe to. Treat them as signals to verify against canonical chain data.', code: 'Event → listener → workflow' },
    { id: 'nonce', cat: 'workflow', title: 'Nonce', badge: 'Transaction order', desc: 'For an externally owned Ethereum account, a sequential transaction counter that helps enforce ordering and prevent replay of the same transaction.', code: 'Account nonce · pending tx' },
    { id: 'rpc', cat: 'chain', title: 'RPC endpoint', badge: 'Node interface', desc: 'An interface, commonly JSON-RPC over HTTP or WebSocket, through which an application asks a node for data or submits transactions.', code: 'eth_call · eth_sendRawTransaction' },
  ];

  const filteredTerms = termFilter === 'all' ? terms : terms.filter(t => t.cat === termFilter);

  return (
    <div className="min-h-screen flex flex-col docs-page" style={{ color: '#182a28' }}>
      <div style={{ width: '100%', maxWidth: '1240px', margin: 'auto', padding: '28px max(4vw,18px) 70px', minWidth: '0' }}>
        <div className="mb-6">
          <SearchTrigger onClick={() => setIsSearchOpen(true)} />
        </div>
        <div style={{ background: '#123b36', color: '#ffffff', padding: '38px max(5vw,22px) 32px', position: 'relative', overflow: 'hidden', borderRadius: '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#b9e8d8', textTransform: 'uppercase', letterSpacing: '.14em', fontSize: '13.2px', fontWeight: '800', marginBottom: '27px' }}>
            <span style={{ width: '30px', height: '30px', display: 'grid', placeItems: 'center', border: '1px solid #80cbb6', borderRadius: '9px', fontSize: '19.2px' }}>⬡</span>
            Architecture field guide · Web3 + workflow
          </div>
          <h1 id="page-heading" tabIndex={-1} style={{ color: '#ffffff', fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', letterSpacing: '-.035em', fontSize: 'clamp(33.6px, 6vw, 69.6px)', lineHeight: '1.02', maxWidth: '850px', margin: '0 0 18px' }}>
            Orchestrating value across<br />workflows and the EVM
          </h1>
          <p style={{ maxWidth: '760px', color: '#d2e5de', fontSize: '19.2px', lineHeight: '1.7', margin: '0' }}>
            A practical reference for connecting Java applications through Web3j, coordinating on-chain and off-chain work with BPMN, and understanding EVM consensus, state, storage and peer-to-peer networks.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px', marginTop: '24px' }}>
            <span style={{ border: '1px solid #ffffff38', borderRadius: '99px', padding: '7px 11px', fontSize: '14.4px', color: '#f3fffa', background: '#ffffff0b' }}>Web3j · Java ↔ EVM</span>
            <span style={{ border: '1px solid #ffffff38', borderRadius: '99px', padding: '7px 11px', fontSize: '14.4px', color: '#f3fffa', background: '#ffffff0b' }}>BPMN · Durable orchestration</span>
            <span style={{ border: '1px solid #ffffff38', borderRadius: '99px', padding: '7px 11px', fontSize: '14.4px', color: '#f3fffa', background: '#ffffff0b' }}>On-chain + off-chain</span>
            <span style={{ border: '1px solid #ffffff38', borderRadius: '99px', padding: '7px 11px', fontSize: '14.4px', color: '#f3fffa', background: '#ffffff0b' }}>Consensus · State · P2P</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '20px', margin: '36px 0 18px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#0c9b79', fontSize: '13.2px', letterSpacing: '.13em', textTransform: 'uppercase', fontWeight: '850' }}>01 / At a glance</div>
            <h2 id="building-blocks" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', letterSpacing: '-.035em', fontSize: '33.6px', margin: '7px 0 0', scrollMarginTop: '80px' }}>Four architectural building blocks</h2>
          </div>
          <div style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', maxWidth: '650px' }}>Keep business process coordination separate from blockchain execution and consensus.</div>
        </div>

        <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))' }}>
          <article style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '16px', padding: '20px', minWidth: '0' }}>
            <div style={{ width: '37px', height: '37px', display: 'grid', placeItems: 'center', borderRadius: '11px', background: '#edf4f0', color: '#0c9b79', fontSize: '21.6px', marginBottom: '16px', fontWeight: '850' }}>⇄</div>
            <h3 style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '21.6px', margin: '0 0 8px' }}>Web3j</h3>
            <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', margin: '8px 0 0' }}>A Java library for connecting applications to Ethereum-compatible nodes, calling contracts, encoding transactions and reading chain data.</p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '99px', padding: '5px 9px', fontSize: '13.2px', fontWeight: '800', background: '#d9f1e8', color: '#163b34', marginTop: '8px' }}>Application integration</span>
          </article>
          <article style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '16px', padding: '20px', minWidth: '0' }}>
            <div style={{ width: '37px', height: '37px', display: 'grid', placeItems: 'center', borderRadius: '11px', background: '#edf4f0', color: '#0c9b79', fontSize: '21.6px', marginBottom: '16px', fontWeight: '850' }}>◷</div>
            <h3 style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '21.6px', margin: '0 0 8px' }}>BPMN orchestration</h3>
            <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', margin: '8px 0 0' }}>A workflow model for sequencing tasks, handling waits and retries, applying business rules and coordinating services over time.</p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '99px', padding: '5px 9px', fontSize: '13.2px', fontWeight: '800', background: '#d9f1e8', color: '#163b34', marginTop: '8px' }}>Process coordination</span>
          </article>
          <article style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '16px', padding: '20px', minWidth: '0' }}>
            <div style={{ width: '37px', height: '37px', display: 'grid', placeItems: 'center', borderRadius: '11px', background: '#edf4f0', color: '#0c9b79', fontSize: '21.6px', marginBottom: '16px', fontWeight: '850' }}>⬡</div>
            <h3 style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '21.6px', margin: '0 0 8px' }}>EVM + consensus</h3>
            <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', margin: '8px 0 0' }}>The EVM executes compatible smart-contract bytecode. A consensus protocol helps participating validators agree on canonical blocks and ordering.</p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '99px', padding: '5px 9px', fontSize: '13.2px', fontWeight: '800', background: '#d9f1e8', color: '#163b34', marginTop: '8px' }}>Shared execution</span>
          </article>
          <article style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '16px', padding: '20px', minWidth: '0' }}>
            <div style={{ width: '37px', height: '37px', display: 'grid', placeItems: 'center', borderRadius: '11px', background: '#edf4f0', color: '#0c9b79', fontSize: '21.6px', marginBottom: '16px', fontWeight: '850' }}>▤</div>
            <h3 style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '21.6px', margin: '0 0 8px' }}>State + storage</h3>
            <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', margin: '8px 0 0' }}>Blockchain state represents current account and contract data; transaction history and logs provide evidence of how state changed.</p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '99px', padding: '5px 9px', fontSize: '13.2px', fontWeight: '800', background: '#d9f1e8', color: '#163b34', marginTop: '8px' }}>Verifiable records</span>
          </article>
        </div>

        {renderStage >= 1 && (<>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '20px', margin: '36px 0 18px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#0c9b79', fontSize: '13.2px', letterSpacing: '.13em', textTransform: 'uppercase', fontWeight: '850' }}>02 / System view</div>
            <h2 id="reference-architecture" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', letterSpacing: '-.035em', fontSize: '33.6px', margin: '7px 0 0', scrollMarginTop: '80px' }}>Reference architecture</h2>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '99px', padding: '5px 9px', fontSize: '13.2px', fontWeight: '800', background: '#d9f1e8', color: '#163b34' }}>Illustrative design</span>
        </div>

        <section style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '18px', padding: '22px' }}>
          <div className="docs-flow-row">
            <div style={{ border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px', background: '#edf4f0', minHeight: '124px', borderTop: '3px solid #8b67c9' }}>
              <div style={{ fontSize: '24px' }}>◷</div>
              <strong style={{ display: 'block', fontSize: '16.8px', margin: '9px 0 5px' }}>BPMN workflow engine</strong>
              <small style={{ display: 'block', color: '#62736e', fontSize: '14.4px', lineHeight: '1.55' }}>Business process, timers, retries, approvals, compensation and durable wait states.</small>
            </div>
            <div className="docs-flow-arrow" style={{ display: 'grid', placeItems: 'center', color: '#0c9b79', fontSize: '27.6px', fontWeight: '900' }}>→</div>
            <div style={{ border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px', background: '#edf4f0', minHeight: '124px', borderTop: '3px solid #4777d8' }}>
              <div style={{ fontSize: '24px' }}>☕</div>
              <strong style={{ display: 'block', fontSize: '16.8px', margin: '9px 0 5px' }}>Java service + Web3j</strong>
              <small style={{ display: 'block', color: '#62736e', fontSize: '14.4px', lineHeight: '1.55' }}>Build contract calls, sign or submit transactions, query receipts, logs and contract state.</small>
            </div>
            <div className="docs-flow-arrow" style={{ display: 'grid', placeItems: 'center', color: '#0c9b79', fontSize: '27.6px', fontWeight: '900' }}>→</div>
            <div style={{ border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px', background: '#edf4f0', minHeight: '124px', borderTop: '3px solid #0c9b79' }}>
              <div style={{ fontSize: '24px' }}>⬡</div>
              <strong style={{ display: 'block', fontSize: '16.8px', margin: '9px 0 5px' }}>EVM-compatible network</strong>
              <small style={{ display: 'block', color: '#62736e', fontSize: '14.4px', lineHeight: '1.55' }}>RPC endpoint → transaction pool → block proposal / consensus → EVM execution.</small>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', color: '#62736e', fontSize: '13.2px', margin: '12px 2px 22px', flexWrap: 'wrap' }}>
            <span>Business intent and long-running coordination</span>
            <span>Transaction boundary</span>
            <span>Network execution and shared ledger</span>
          </div>
          <div className="docs-flow-row">
            <div style={{ border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px', background: '#edf4f0', minHeight: '124px' }}>
              <div style={{ fontSize: '24px' }}>▧</div>
              <strong style={{ display: 'block', fontSize: '16.8px', margin: '9px 0 5px' }}>Off-chain systems</strong>
              <small style={{ display: 'block', color: '#62736e', fontSize: '14.4px', lineHeight: '1.55' }}>Banking APIs, KYC/AML, ERP/POS, databases, notifications and document stores.</small>
            </div>
            <div className="docs-flow-arrow" style={{ display: 'grid', placeItems: 'center', color: '#0c9b79', fontSize: '27.6px', fontWeight: '900' }}>↔</div>
            <div style={{ border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px', background: '#edf4f0', minHeight: '124px', borderTop: '3px solid #bd7a1c' }}>
              <div style={{ fontSize: '24px' }}>▤</div>
              <strong style={{ display: 'block', fontSize: '16.8px', margin: '9px 0 5px' }}>Event + state tracking</strong>
              <small style={{ display: 'block', color: '#62736e', fontSize: '14.4px', lineHeight: '1.55' }}>Workflow variables, transaction hash, nonce, receipt status, block number and confirmation policy.</small>
            </div>
            <div className="docs-flow-arrow" style={{ display: 'grid', placeItems: 'center', color: '#0c9b79', fontSize: '27.6px', fontWeight: '900' }}>↔</div>
            <div style={{ border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px', background: '#edf4f0', minHeight: '124px' }}>
              <div style={{ fontSize: '24px' }}>⌘</div>
              <strong style={{ display: 'block', fontSize: '16.8px', margin: '9px 0 5px' }}>Peer-to-peer nodes</strong>
              <small style={{ display: 'block', color: '#62736e', fontSize: '14.4px', lineHeight: '1.55' }}>Nodes exchange transactions and blocks; validators / clients follow the network protocol.</small>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: '15px', marginTop: '18px' }}>
            <div style={{ border: '1px dashed #dce7e1', borderRadius: '14px', padding: '17px' }}>
              <h3 style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '18px', color: '#4777d8' }}>↗ Off-chain lane</h3>
              <div style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65' }}>Flexible, private business operations</div>
              <div style={{ marginTop: '9px' }}>
                <span style={{ display: 'inline-block', margin: '4px 4px 0 0', padding: '6px 9px', borderRadius: '7px', background: '#edf4f0', fontSize: '13.2px', color: '#182a28' }}>Validate identity</span>
                <span style={{ color: '#62736e', padding: '0 2px' }}>→</span>
                <span style={{ display: 'inline-block', margin: '4px 4px 0 0', padding: '6px 9px', borderRadius: '7px', background: '#edf4f0', fontSize: '13.2px', color: '#182a28' }}>Check limits</span>
                <span style={{ color: '#62736e', padding: '0 2px' }}>→</span>
                <span style={{ display: 'inline-block', margin: '4px 4px 0 0', padding: '6px 9px', borderRadius: '7px', background: '#edf4f0', fontSize: '13.2px', color: '#182a28' }}>Approve / enrich</span>
                <span style={{ color: '#62736e', padding: '0 2px' }}>→</span>
                <span style={{ display: 'inline-block', margin: '4px 4px 0 0', padding: '6px 9px', borderRadius: '7px', background: '#edf4f0', fontSize: '13.2px', color: '#182a28' }}>Call Java service</span>
              </div>
            </div>
            <div style={{ border: '1px dashed #dce7e1', borderRadius: '14px', padding: '17px' }}>
              <h3 style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '18px', color: '#0c9b79' }}>⬡ On-chain lane</h3>
              <div style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65' }}>Shared, deterministic contract execution</div>
              <div style={{ marginTop: '9px' }}>
                <span style={{ display: 'inline-block', margin: '4px 4px 0 0', padding: '6px 9px', borderRadius: '7px', background: '#edf4f0', fontSize: '13.2px', color: '#182a28' }}>Submit transaction</span>
                <span style={{ color: '#62736e', padding: '0 2px' }}>→</span>
                <span style={{ display: 'inline-block', margin: '4px 4px 0 0', padding: '6px 9px', borderRadius: '7px', background: '#edf4f0', fontSize: '13.2px', color: '#182a28' }}>Consensus / inclusion</span>
                <span style={{ color: '#62736e', padding: '0 2px' }}>→</span>
                <span style={{ display: 'inline-block', margin: '4px 4px 0 0', padding: '6px 9px', borderRadius: '7px', background: '#edf4f0', fontSize: '13.2px', color: '#182a28' }}>EVM executes</span>
                <span style={{ color: '#62736e', padding: '0 2px' }}>→</span>
                <span style={{ display: 'inline-block', margin: '4px 4px 0 0', padding: '6px 9px', borderRadius: '7px', background: '#edf4f0', fontSize: '13.2px', color: '#182a28' }}>Receipt + event</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '14px', padding: '13px 15px', borderLeft: '3px solid #bd7a1c', background: '#fff7e8', color: '#664719', borderRadius: '0 9px 9px 0', fontSize: '14.4px', lineHeight: '1.6' }}>
            <strong>Important boundary:</strong> BPMN does not itself create blockchain consensus, and Web3j is not a consensus engine. The workflow coordinates business actions; the blockchain protocol determines transaction ordering/finality; the smart contract enforces on-chain rules.
          </div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '20px', margin: '36px 0 18px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#0c9b79', fontSize: '13.2px', letterSpacing: '.13em', textTransform: 'uppercase', fontWeight: '850' }}>03 / Vocabulary</div>
            <h2 id="core-terminology" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', letterSpacing: '-.035em', fontSize: '33.6px', margin: '7px 0 0', scrollMarginTop: '80px' }}>Core terminology</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button onClick={() => handleFilterTerms('all')} style={{ cursor: 'pointer', font: 'inherit', border: '1px solid #dce7e1', color: '#182a28', background: '#ffffff', borderRadius: '9px', padding: '9px 12px', fontSize: '14.4px', fontWeight: '750' }}>All terms</button>
            <button onClick={() => handleFilterTerms('workflow')} style={{ cursor: 'pointer', font: 'inherit', border: '1px solid #dce7e1', color: '#182a28', background: '#ffffff', borderRadius: '9px', padding: '9px 12px', fontSize: '14.4px', fontWeight: '750' }}>Workflow</button>
            <button onClick={() => handleFilterTerms('chain')} style={{ cursor: 'pointer', font: 'inherit', border: '1px solid #dce7e1', color: '#182a28', background: '#ffffff', borderRadius: '9px', padding: '9px 12px', fontSize: '14.4px', fontWeight: '750' }}>Blockchain</button>
            <button onClick={() => handleFilterTerms('network')} style={{ cursor: 'pointer', font: 'inherit', border: '1px solid #dce7e1', color: '#182a28', background: '#ffffff', borderRadius: '9px', padding: '9px 12px', fontSize: '14.4px', fontWeight: '750' }}>Network</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: '12px' }}>
          {filteredTerms.map((term) => (
            <article key={term.id} style={{ border: '1px solid #dce7e1', borderRadius: '12px', padding: '16px', background: '#ffffff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center', marginBottom: '7px' }}>
                <strong style={{ fontSize: '16.8px' }}>{term.title}</strong>
                <span style={{ fontSize: '12px', padding: '4px 7px', borderRadius: '6px', background: '#edf4f0', color: '#62736e', whiteSpace: 'nowrap' }}>{term.badge}</span>
              </div>
              <p style={{ color: '#62736e', fontSize: '14.4px', lineHeight: '1.6', margin: '0' }}>{term.desc}</p>
              <code style={{ fontFamily: 'ui-monospace,SFMono-Regular,Consolas,monospace', fontSize: '12px', color: '#0c9b79' }}>{term.code}</code>
            </article>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '20px', margin: '36px 0 18px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#0c9b79', fontSize: '13.2px', letterSpacing: '.13em', textTransform: 'uppercase', fontWeight: '850' }}>04 / Lifecycle</div>
            <h2 id="token-transfer-lifecycle" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', letterSpacing: '-.035em', fontSize: '33.6px', margin: '7px 0 0', scrollMarginTop: '80px' }}>Example: orchestrate a token transfer</h2>
          </div>
          <div style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', maxWidth: '650px' }}>A BPMN process can span minutes or days even though contract execution is a discrete transaction.</div>
        </div>

        <div style={{ counterReset: 'seq', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: '10px' }}>
          <article style={{ counterIncrement: 'seq', background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px' }}>
            <div style={{ color: '#0c9b79', fontWeight: '900', fontSize: '14.4px', marginBottom: '13px' }}>01</div>
            <strong style={{ display: 'block', fontSize: '15.6px', marginBottom: '7px' }}>Start + validate</strong>
            <p style={{ color: '#62736e', fontSize: '13.2px', lineHeight: '1.6', margin: '0' }}>Receive transfer request. Validate wallet, business limits, identity and sanctions using off-chain services.</p>
          </article>
          <article style={{ counterIncrement: 'seq', background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px' }}>
            <div style={{ color: '#0c9b79', fontWeight: '900', fontSize: '14.4px', marginBottom: '13px' }}>02</div>
            <strong style={{ display: 'block', fontSize: '15.6px', marginBottom: '7px' }}>Prepare transaction</strong>
            <p style={{ color: '#62736e', fontSize: '13.2px', lineHeight: '1.6', margin: '0' }}>Java worker uses Web3j to encode contract call, estimate gas and manage signer / nonce policy.</p>
          </article>
          <article style={{ counterIncrement: 'seq', background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px' }}>
            <div style={{ color: '#0c9b79', fontWeight: '900', fontSize: '14.4px', marginBottom: '13px' }}>03</div>
            <strong style={{ display: 'block', fontSize: '15.6px', marginBottom: '7px' }}>Submit + wait</strong>
            <p style={{ color: '#62736e', fontSize: '13.2px', lineHeight: '1.6', margin: '0' }}>Submit signed transaction to an RPC node. Persist transaction hash and move BPMN instance to a durable wait state.</p>
          </article>
          <article style={{ counterIncrement: 'seq', background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px' }}>
            <div style={{ color: '#0c9b79', fontWeight: '900', fontSize: '14.4px', marginBottom: '13px' }}>04</div>
            <strong style={{ display: 'block', fontSize: '15.6px', marginBottom: '7px' }}>Confirm execution</strong>
            <p style={{ color: '#62736e', fontSize: '13.2px', lineHeight: '1.6', margin: '0' }}>Poll or consume events, retrieve receipt, check status and apply network-specific confirmation / finality policy.</p>
          </article>
          <article style={{ counterIncrement: 'seq', background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '13px', padding: '16px' }}>
            <div style={{ color: '#0c9b79', fontWeight: '900', fontSize: '14.4px', marginBottom: '13px' }}>05</div>
            <strong style={{ display: 'block', fontSize: '15.6px', marginBottom: '7px' }}>Reconcile + finish</strong>
            <p style={{ color: '#62736e', fontSize: '13.2px', lineHeight: '1.6', margin: '0' }}>Update off-chain records idempotently. On failure, retry safely or start a defined compensation / manual review path.</p>
          </article>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '20px', margin: '36px 0 18px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#0c9b79', fontSize: '13.2px', letterSpacing: '.13em', textTransform: 'uppercase', fontWeight: '850' }}>05 / Example interaction</div>
            <h2 id="web3j-flow" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', letterSpacing: '-.035em', fontSize: '33.6px', margin: '7px 0 0', scrollMarginTop: '80px' }}>Illustrative Java + Web3j flow</h2>
          </div>
          <button onClick={handleCopyCode} style={{ cursor: 'pointer', font: 'inherit', border: '1px solid #dce7e1', color: '#ffffff', background: '#123b36', borderRadius: '9px', padding: '9px 12px', fontSize: '14.4px', fontWeight: '750' }}>{copyButtonText}</button>
        </div>

        <div style={{ background: '#152a27', color: '#e1f6ed', padding: '19px', borderRadius: '14px', overflow: 'auto', overflowWrap: 'anywhere', fontFamily: 'ui-monospace,SFMono-Regular,Consolas,monospace', fontSize: '14.4px', lineHeight: '1.8' }}>
          <span style={{ color: '#85b8a7' }}>{'//'} Conceptual flow only — configure provider, signer and contract wrapper securely.</span><br />
          <span style={{ color: '#9fc2ff' }}>Web3j</span> web3 = Web3j.build(<span style={{ color: '#9fc2ff' }}>new</span> HttpService(rpcUrl));<br /><br />
          <span style={{ color: '#85b8a7' }}>{'//'} 1. Submit a contract method through a generated / loaded wrapper.</span><br />
          TransactionReceipt receipt = tokenContract.transfer(recipient, amount).send();<br /><br />
          <span style={{ color: '#85b8a7' }}>{'//'} 2. Verify execution; a mined transaction can still fail.</span><br />
          <span style={{ color: '#9fc2ff' }}>if</span> (!receipt.isStatusOK()) {'{'}<br />
          &nbsp;&nbsp;<span style={{ color: '#85b8a7' }}>{'//'} BPMN error path: retry only if safe, compensate, or route to review.</span><br />
          &nbsp;&nbsp;<span style={{ color: '#9fc2ff' }}>throw new</span> IllegalStateException(<span style={{ color: '#f1cc8c' }}>"On-chain execution failed"</span>);<br />
          {'}'}<br /><br />
          <span style={{ color: '#85b8a7' }}>{'//'} 3. Persist tx hash + block reference, then reconcile business state idempotently.</span><br />
          String txHash = receipt.getTransactionHash();<br />
          <span style={{ color: '#85b8a7' }}>{'//'} Production: consider async submission, receipt polling, confirmations/finality,</span><br />
          <span style={{ color: '#85b8a7' }}>{'//'} duplicate events, reorg handling, key custody, gas and nonce coordination.</span>
        </div>
        <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', maxWidth: '650px' }}>The snippet is illustrative and assumes a compatible contract wrapper and APIs. In production, avoid blocking a workflow worker for long confirmation waits; persist the hash and resume the process from a message, timer or job.</p>
        </>)}

        {renderStage >= 2 && (<>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '20px', margin: '36px 0 18px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#0c9b79', fontSize: '13.2px', letterSpacing: '.13em', textTransform: 'uppercase', fontWeight: '850' }}>06 / Design decisions</div>
            <h2 id="reliability-rules" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', letterSpacing: '-.035em', fontSize: '33.6px', margin: '7px 0 0', scrollMarginTop: '80px' }}>Reliability rules of thumb</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))' }}>
          <article style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '16px', padding: '20px', minWidth: '0' }}>
            <h3 style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '21.6px', margin: '0 0 8px' }}>Separate responsibilities</h3>
            <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', margin: '8px 0 0' }}>BPMN owns business progression. Java/Web3j owns node integration. Smart contracts own on-chain invariants. Consensus belongs to the network protocol.</p>
          </article>
          <article style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '16px', padding: '20px', minWidth: '0' }}>
            <h3 style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '21.6px', margin: '0 0 8px' }}>Assume asynchronous outcomes</h3>
            <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', margin: '8px 0 0' }}>A successful RPC submission is not the same as inclusion, and inclusion is not always finality. Model submitted, included, confirmed, failed and replaced states explicitly.</p>
          </article>
          <article style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '16px', padding: '20px', minWidth: '0' }}>
            <h3 style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '21.6px', margin: '0 0 8px' }}>Design for duplicates</h3>
            <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', margin: '8px 0 0' }}>Workers retry; events may be replayed; processes may restart. Use idempotent handlers, unique operation IDs, contract-level safeguards and reconciliation.</p>
          </article>
          <article style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '16px', padding: '20px', minWidth: '0' }}>
            <h3 style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '21.6px', margin: '0 0 8px' }}>Protect keys and privacy</h3>
            <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', margin: '8px 0 0' }}>Keep private keys out of BPMN variables and logs. Use a signer / custody boundary. Put sensitive personal or commercial data off-chain where appropriate.</p>
          </article>
          <article style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '16px', padding: '20px', minWidth: '0' }}>
            <h3 style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '21.6px', margin: '0 0 8px' }}>Know the network model</h3>
            <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', margin: '8px 0 0' }}>Consensus, finality, permissioning and validator roles depend on the chosen chain. Public Ethereum and a permissioned QBFT network are not interchangeable.</p>
          </article>
          <article style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '16px', padding: '20px', minWidth: '0' }}>
            <h3 style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '21.6px', margin: '0 0 8px' }}>Make recovery explicit</h3>
            <p style={{ color: '#62736e', fontSize: '15.6px', lineHeight: '1.65', margin: '8px 0 0' }}>Define timeout, transaction replacement, reorg, contract revert, low gas, RPC outage, manual review and compensation paths before production.</p>
          </article>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '20px', margin: '36px 0 18px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#0c9b79', fontSize: '13.2px', letterSpacing: '.13em', textTransform: 'uppercase', fontWeight: '850' }}>07 / Clarifications</div>
            <h2 id="common-misconceptions" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', letterSpacing: '-.035em', fontSize: '33.6px', margin: '7px 0 0', scrollMarginTop: '80px' }}>Common misconceptions</h2>
          </div>
        </div>

        <details style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '12px', padding: '14px 16px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '750', fontSize: '15.6px' }}>Does BPMN execute smart contracts?</summary>
          <p style={{ color: '#62736e', fontSize: '14.4px', lineHeight: '1.7', marginBottom: '0' }}>No. BPMN defines the process and invokes workers or services. A Java worker may use Web3j to interact with a node, which processes the transaction according to the chain\'s protocol.</p>
        </details>
        <details style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '12px', padding: '14px 16px', marginTop: '9px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '750', fontSize: '15.6px' }}>Is blockchain storage the same as transaction history?</summary>
          <p style={{ color: '#62736e', fontSize: '14.4px', lineHeight: '1.7', marginBottom: '0' }}>No. Contract storage is part of current world state. Transaction history, receipts and logs describe activity that led to state changes. Node implementations may prune or archive different data, so data availability should be planned.</p>
        </details>
        <details style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '12px', padding: '14px 16px', marginTop: '9px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '750', fontSize: '15.6px' }}>Does P2P networking equal consensus?</summary>
          <p style={{ color: '#62736e', fontSize: '14.4px', lineHeight: '1.7', marginBottom: '0' }}>No. P2P transports messages among nodes. Consensus rules determine how participants agree on block ordering and finality. Networking supports consensus but does not define it by itself.</p>
        </details>
        <details style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '12px', padding: '14px 16px', marginTop: '9px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '750', fontSize: '15.6px' }}>Can an off-chain database transaction be rolled back by the EVM?</summary>
          <p style={{ color: '#62736e', fontSize: '14.4px', lineHeight: '1.7', marginBottom: '0' }}>No. The database and blockchain have separate transaction boundaries. Use a saga-style process, explicit compensating actions and reconciliation to handle partial completion.</p>
        </details>
        <details style={{ background: '#ffffff', border: '1px solid #dce7e1', borderRadius: '12px', padding: '14px 16px', marginTop: '9px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '750', fontSize: '15.6px' }}>Where should workflow state live?</summary>
          <p style={{ color: '#62736e', fontSize: '14.4px', lineHeight: '1.7', marginBottom: '0' }}>Store process progress and operational metadata in the workflow engine and supporting application store; keep the authoritative on-chain facts in the contract / chain. Persist transaction hashes and enough metadata to resume and reconcile after restarts.</p>
        </details>

        <footer style={{ borderTop: '1px solid #dce7e1', marginTop: '36px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', gap: '20px', color: '#62736e', fontSize: '13.2px', flexWrap: 'wrap' }}>
          <span>Web3j × BPMN × EVM · Architecture reference</span>
          <span>Self-contained document webpage · Use as a learning and design aid</span>
        </footer>
        </>)}
      </div>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
