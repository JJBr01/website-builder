import { describe, expect, it } from 'vitest';
import { buildMailto } from '@/lib/inquiry-form';
import { CONTACT_EMAIL, inquiryToText, type Inquiry } from '@/lib/inquiry';

const inquiry: Inquiry = { name: 'Justin James', email: 'justin@example.com', scope: ['Development'], notes: 'A new website.' };

describe('Inquiry email fallback', () => {
  it('preserves a short inquiry and the existing email destination', () => {
    const url = buildMailto(inquiry);
    expect(url.startsWith(`mailto:${CONTACT_EMAIL}?`)).toBe(true);
    expect(new URLSearchParams(url.split('?')[1]).get('body')).toBe(inquiryToText(inquiry));
  });
  it('keeps the complete encoded mailto below 1800 characters', () => {
    const url = buildMailto({ ...inquiry, name: '界'.repeat(100), notes: '🚀'.repeat(500) });
    expect(url.length).toBeLessThan(1800);
    expect(url.length).toBeGreaterThan(1700);
    expect(() => decodeURIComponent(url)).not.toThrow();
  });
});