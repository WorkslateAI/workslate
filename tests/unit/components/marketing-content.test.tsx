import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { heroCopy, featureCopy, p2pWorkflowCopy } from '../../../src/content/copy';
import { headerNavigation } from '../../../src/content/navigation';
import { markets, chains } from '../../../src/content/chains';
import { features } from '../../../src/content/features';
import { dashboardData } from '../../../src/content/dashboard';

describe('Marketing Content', () => {
  describe('Hero Copy', () => {
    it('contains exact heading "From Market to Market. Your Token. Everywhere."', () => {
      expect(heroCopy.heading).toBe('From Market to Market. Your Token. Everywhere.');
    });

    it('contains eyebrow text', () => {
      expect(heroCopy.eyebrow).toBe('AI-Powered Token Movement');
    });

    it('contains Get Started and Watch Demo CTAs', () => {
      expect(heroCopy.getStarted).toBe('Get Started');
      expect(heroCopy.watchDemo).toBe('Watch Demo');
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

    it('contains Ethereum, Polygon, BSC, Arbitrum, and Optimism', () => {
      const chainNames = chains.map(c => c.name);
      expect(chainNames).toContain('Ethereum');
      expect(chainNames).toContain('Polygon');
      expect(chainNames).toContain('BSC');
      expect(chainNames).toContain('Arbitrum');
      expect(chainNames).toContain('Optimism');
    });
  });

  describe('Features', () => {
    it('contains three features with correct numbers', () => {
      expect(features).toHaveLength(3);
      expect(features[0].number).toBe('01');
      expect(features[1].number).toBe('02');
      expect(features[2].number).toBe('03');
    });

    it('feature titles match specification', () => {
      expect(features[0].title).toBe('Seamless Money Movement');
      expect(features[1].title).toBe('EVM Nodes');
      expect(features[2].title).toBe('Single Source of Truth');
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
  });
});
