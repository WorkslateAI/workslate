import { describe, it, expect } from 'vitest';
import { howItWorksCopy, developersCopy } from '../../../src/content/copy';

describe('Workflow and Developers Content', () => {
  describe('How It Works Workflow', () => {
    it('contains ordered steps', () => {
      expect(howItWorksCopy.steps).toHaveLength(4);
      expect(howItWorksCopy.steps[0].id).toBe('01');
      expect(howItWorksCopy.steps[1].id).toBe('02');
      expect(howItWorksCopy.steps[2].id).toBe('03');
      expect(howItWorksCopy.steps[3].id).toBe('04');
    });

    it('step titles are descriptive', () => {
      const titles = howItWorksCopy.steps.map(s => s.title);
      expect(titles).toContain('Connect Your Business Records');
      expect(titles).toContain('Reconcile Before You Move');
      expect(titles).toContain('Validate. Approve. Authorize.');
      expect(titles).toContain('Execute. Verify. Settle.');
    });
  });

  describe('Web3j Copy', () => {
    it('explicitly states Web3j is planned', () => {
      expect(developersCopy.web3jDescription).toContain('Planned');
      expect(developersCopy.web3jDescription).toContain('roadmap');
    });

    it('explicitly states Web3j is not currently supported', () => {
      expect(developersCopy.web3jDescription).toContain('Not currently supported');
      expect(developersCopy.web3jDescription).not.toContain('currently available');
    });
  });
});
