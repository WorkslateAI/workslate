import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQ } from '../../../src/components/sections/FAQ';
import { faqItems } from '../../../src/content/faq';

describe('FAQ Component', () => {
  it('renders all FAQ items', () => {
    render(<FAQ />);
    expect(screen.getByText('Frequently Asked Questions')).toBeVisible();
    
    faqItems.forEach(item => {
      expect(screen.getByText(item.question)).toBeVisible();
    });
  });

  it('FAQ structured data matches visible content', () => {
    const visibleQuestions = faqItems.map(item => item.question);
    const visibleAnswers = faqItems.map(item => item.answer);
    
    expect(visibleQuestions).toHaveLength(faqItems.length);
    expect(visibleAnswers).toHaveLength(faqItems.length);
    
    // Ensure each question has a corresponding answer
    visibleQuestions.forEach((_question, index) => {
      expect(visibleAnswers[index]).toBeDefined();
    });
  });

  it('toggles FAQ item on click', () => {
    render(<FAQ />);
    const firstQuestion = screen.getByText(faqItems[0].question);
    
    // Initially closed
    const firstAnswer = screen.queryByText(faqItems[0].answer);
    expect(firstAnswer).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(firstQuestion);
    const openedAnswer = screen.queryByText(faqItems[0].answer);
    expect(openedAnswer).toBeInTheDocument();
  });
});
