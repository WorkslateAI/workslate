import { describe, it, expect } from 'vitest';
import { heroCopy } from '../../../src/content/copy';
import { headerNavigation } from '../../../src/content/navigation';
import { markets, chains, roadmapChains } from '../../../src/content/chains';
import { features } from '../../../src/content/features';
import { dashboardData } from '../../../src/content/dashboard';

describe('Marketing Content', () => {
  describe('Hero Copy', () => {
    it('contains exact heading "Reconcile First. Move Value with Confidence."', () => {
      expect(heroCopy.heading).toBe('Reconcile First. Move Value with Confidence.');
    });

    it('contains eyebrow text', () => {
      expect(heroCopy.eyebrow).toContain('AI-Powered');
    });

    it('contains Register for demo and Watch video CTAs', () => {
      expect(heroCopy.getStarted).toBe('Register for demo');
      expect(heroCopy.watchDemo).toBe('Watch video');
    });
  });

  describe('Navigation', () => {
    it('contains all required header navigation items', () => {
      const labels = headerNavigation.map(item => item.label);
      expect(labels).toContain('Home');
      expect(labels).toContain('Features');
      expect(labels).toContain('How It Works');
      expect(labels).toContain('Docs');
      expect(labels).toContain('Pricing');
      expect(labels).toContain('Sign In');
      expect(labels).toContain('Get Started');
    });

    it('Docs links to #docs anchor', () => {
      const docsLink = headerNavigation.find(item => item.label === 'Docs');
      expect(docsLink?.href).toBe('#docs');
    });
  });

  describe('Chains and Markets', () => {
    it('contains markets A, B, and C', () => {
      const marketNames = markets.map(m => m.name);
      expect(marketNames).toContain('Market A');
      expect(marketNames).toContain('Market B');
      expect(marketNames).toContain('Market C');
    });

    it('supports Ethereum as the current chain', () => {
      const chainNames = chains.map(c => c.name);
      expect(chainNames).toContain('Ethereum');
    });

    it('lists Polygon, BSC, Arbitrum, and Optimism as roadmap chains', () => {
      const roadmapNames = roadmapChains.map(c => c.name);
      expect(roadmapNames).toContain('Polygon');
      expect(roadmapNames).toContain('BSC');
      expect(roadmapNames).toContain('Arbitrum');
      expect(roadmapNames).toContain('Optimism');
    });
  });

  describe('Features', () => {
    it('contains four features with correct numbers', () => {
      expect(features).toHaveLength(4);
      expect(features[0].number).toBe('01');
      expect(features[1].number).toBe('02');
      expect(features[2].number).toBe('03');
      expect(features[3].number).toBe('04');
    });

    it('feature titles match the live section', () => {
      expect(features[0].title).toBe('Multi-Party Ledger Reconciliation');
      expect(features[1].title).toBe('Corporate Wallet Orchestration');
      expect(features[2].title).toBe('Programmable Settlement Rules');
      expect(features[3].title).toBe('End-to-End Transaction Traceability');
    });
  });

  describe('Dashboard Data', () => {
    it('is marked as simulated', () => {
      expect(dashboardData.dataStatus).toBe('simulated');
    });

    it('contains volume and transaction count', () => {
      expect(dashboardData.volume).toBeDefined();
      expect(dashboardData.transactionCount).toBeDefined();
    });

    it('contains sample transactions', () => {
      expect(dashboardData.transactions).toHaveLength(3);
      expect(dashboardData.transactions[0].id).toBe('tx-001');
    });

    it('transactions settle between business counterparties on Ethereum', () => {
      dashboardData.transactions.forEach((tx) => {
        expect(tx.sender).toBeTruthy();
        expect(tx.receiver).toBeTruthy();
        expect(tx.chain).toBe('Ethereum');
        expect(tx.asset).toBe('USDC');
        expect(['Settled', 'Pending Authorization']).toContain(tx.status);
      });
    });
  });
});
