import { describe, expect, it } from 'vitest';
import { projectStartingPrice, projectFaqs, projectFaqSchema } from '@/lib/project-offer';

describe('Approved project offer', () => {
  it('uses a typical starting price of $15k', () => {
    expect(projectStartingPrice).toBe(15000);
  });
  it('provides each FAQ answer unchanged to structured data', () => {
    expect(projectFaqSchema['@type']).toBe('FAQPage');
    expect(projectFaqSchema.mainEntity).toHaveLength(6);
    projectFaqs.forEach((faq, index) => {
      expect(projectFaqSchema.mainEntity[index]?.name).toBe(faq.question);
      expect(projectFaqSchema.mainEntity[index]?.acceptedAnswer.text).toBe(faq.answer);
    });
  });
});