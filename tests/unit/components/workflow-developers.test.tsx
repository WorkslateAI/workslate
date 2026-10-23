import { describe, it, expect } from 'vitest';
import { p2pWorkflowCopy, developersCopy } from '../../../src/content/copy';

describe('Workflow and Developers Content', () => {
  describe('P2P Workflow', () => {
    it('contains ordered steps', () => {
      expect(p2pWorkflowCopy.steps).toHaveLength(3);
      expect(p2pWorkflowCopy.steps[0].step).toBe(1);
      expect(p2pWorkflowCopy.steps[1].step).toBe(2);
      expect(p2pWorkflowCopy.steps[2].step).toBe(3);
    });

    it('step titles are descriptive', () => {
      const titles = p2pWorkflowCopy.steps.map(s => s.title);
      expect(titles).toContain('Connect Your Wallet');
      expect(titles).toContain('Select Source & Destination');
      expect(titles).toContain('Execute P2P Transfer');
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
