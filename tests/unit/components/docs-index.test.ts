import { describe, it, expect } from 'vitest';
import { docsIndex, generateDocsIndex } from '../../../src/search/docsIndex';

describe('docsIndex', () => {
  it('generates search index with correct structure', () => {
    const index = generateDocsIndex();

    expect(Array.isArray(index)).toBe(true);
    expect(index.length).toBeGreaterThan(0);
  });

  it('each record has required fields', () => {
    const index = generateDocsIndex();

    index.forEach((record) => {
      expect(record).toHaveProperty('id');
      expect(record).toHaveProperty('title');
      expect(record).toHaveProperty('breadcrumb');
      expect(record).toHaveProperty('anchor');
      expect(record).toHaveProperty('content');
      expect(record).toHaveProperty('path');
      expect(typeof record.id).toBe('string');
      expect(typeof record.title).toBe('string');
      expect(Array.isArray(record.breadcrumb)).toBe(true);
      expect(typeof record.anchor).toBe('string');
      expect(typeof record.content).toBe('string');
      expect(typeof record.path).toBe('string');
    });
  });

  it('has unique IDs', () => {
    const index = generateDocsIndex();
    const ids = index.map((r) => r.id);
    const uniqueIds = new Set(ids);

    expect(ids.length).toBe(uniqueIds.size);
  });

  it('includes hero section', () => {
    const index = generateDocsIndex();
    const heroRecord = index.find((r) => r.id === 'hero');

    expect(heroRecord).toBeDefined();
    expect(heroRecord?.title).toBe('Orchestrating value across workflows and the EVM');
  });

  it('includes building blocks section', () => {
    const index = generateDocsIndex();
    const buildingBlocks = index.find((r) => r.id === 'building-blocks');

    expect(buildingBlocks).toBeDefined();
    expect(buildingBlocks?.title).toBe('Four architectural building blocks');
    expect(buildingBlocks?.anchor).toBe('building-blocks');
  });

  it('includes reference architecture section', () => {
    const index = generateDocsIndex();
    const refArch = index.find((r) => r.id === 'reference-architecture');

    expect(refArch).toBeDefined();
    expect(refArch?.title).toBe('Reference architecture');
    expect(refArch?.anchor).toBe('reference-architecture');
  });

  it('includes core terminology as breadcrumb for terms', () => {
    const index = generateDocsIndex();
    const web3jTerm = index.find((r) => r.id === 'term-web3j');

    expect(web3jTerm).toBeDefined();
    expect(web3jTerm?.breadcrumb).toContain('Core terminology');
    expect(web3jTerm?.anchor).toBe('core-terminology');
  });

  it('includes term records with breadcrumbs', () => {
    const index = generateDocsIndex();
    const web3jTerm = index.find((r) => r.id === 'term-web3j');

    expect(web3jTerm).toBeDefined();
    expect(web3jTerm?.title).toBe('Web3j');
    expect(web3jTerm?.breadcrumb).toEqual(['Core terminology']);
    expect(web3jTerm?.code).toBeDefined();
  });

  it('includes all 18 terminology terms', () => {
    const index = generateDocsIndex();
    const termRecords = index.filter((r) => r.id.startsWith('term-'));

    expect(termRecords.length).toBe(18);
  });

  it('includes token transfer lifecycle section', () => {
    const index = generateDocsIndex();
    const lifecycle = index.find((r) => r.id === 'token-transfer-lifecycle');

    expect(lifecycle).toBeDefined();
    expect(lifecycle?.title).toBe('Example: orchestrate a token transfer');
    expect(lifecycle?.anchor).toBe('token-transfer-lifecycle');
  });

  it('includes Web3j flow section with code', () => {
    const index = generateDocsIndex();
    const web3jFlow = index.find((r) => r.id === 'web3j-flow');

    expect(web3jFlow).toBeDefined();
    expect(web3jFlow?.title).toBe('Illustrative Java + Web3j flow');
    expect(web3jFlow?.anchor).toBe('web3j-flow');
    expect(web3jFlow?.code).toBeDefined();
    expect(web3jFlow?.code).toContain('Web3j');
  });

  it('includes reliability rules section', () => {
    const index = generateDocsIndex();
    const reliability = index.find((r) => r.id === 'reliability-rules');

    expect(reliability).toBeDefined();
    expect(reliability?.title).toBe('Reliability rules of thumb');
    expect(reliability?.anchor).toBe('reliability-rules');
  });

  it('includes common misconceptions section', () => {
    const index = generateDocsIndex();
    const misconceptions = index.find((r) => r.id === 'common-misconceptions');

    expect(misconceptions).toBeDefined();
    expect(misconceptions?.title).toBe('Common misconceptions');
    expect(misconceptions?.anchor).toBe('common-misconceptions');
  });

  it('all records have correct path', () => {
    const index = generateDocsIndex();

    index.forEach((record) => {
      expect(record.path).toBe('/docs.html');
    });
  });

  it('content is plain text without HTML', () => {
    const index = generateDocsIndex();

    index.forEach((record) => {
      expect(record.content).not.toContain('<');
      expect(record.content).not.toContain('>');
    });
  });

  it('exported docsIndex is the same as generateDocsIndex', () => {
    const generated = generateDocsIndex();
    expect(docsIndex).toEqual(generated);
  });
});
