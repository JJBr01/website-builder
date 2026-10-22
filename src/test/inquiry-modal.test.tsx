import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InquiryModal } from '@/components/site/inquiry-modal';
import { sendInquiry } from '@/lib/inquiry';

vi.mock('@/lib/inquiry', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/inquiry')>();
  return { ...actual, sendInquiry: vi.fn() };
});

afterEach(() => { cleanup(); vi.clearAllMocks(); document.body.style.overflow = ''; });
const open = () => render(<InquiryModal onClose={vi.fn()} onRestoreFocus={vi.fn()} />);
const submit = () => fireEvent.click(screen.getByRole('button', { name: 'Send inquiry' }));
const selectScope = () => fireEvent.click(screen.getByRole('button', { name: 'Development' }));

describe('Accessible inquiry behavior', () => {
  it('focuses the heading and restores the previous body overflow on unmount', () => {
    document.body.style.overflow = 'clip';
    const view = open();
    expect(screen.getByRole('heading', { name: 'Tell us what you’re building.' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
    view.unmount();
    expect(document.body.style.overflow).toBe('clip');
  });
  it('associates name errors and focuses the first invalid field', async () => {
    open(); submit();
    const name = screen.getByLabelText('Name');
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription('Please enter your name.');
    await waitFor(() => expect(name).toHaveFocus());
    expect(sendInquiry).not.toHaveBeenCalled();
  });
  it('uses the schema email error rather than native validation', async () => {
    open(); selectScope();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Justin' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid' } });
    submit();
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Please enter a valid email.');
    await waitFor(() => expect(screen.getByLabelText('Email')).toHaveFocus());
    expect(sendInquiry).not.toHaveBeenCalled();
  });
  it('associates the scope error and focuses the first scope chip', async () => {
    open();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Justin' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'justin@example.com' } });
    submit();
    const chip = screen.getByRole('button', { name: 'Branding' });
    expect(chip).toHaveAccessibleDescription('Pick at least one scope.');
    await waitFor(() => expect(chip).toHaveFocus());
  });
  it('associates notes errors with the notes field', async () => {
    open(); selectScope();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Justin' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'justin@example.com' } });
    fireEvent.change(screen.getByLabelText('Project notes'), { target: { value: 'a'.repeat(1001) } });
    submit();
    expect(screen.getByLabelText('Project notes')).toHaveAccessibleDescription('Notes must be under 1000 characters.');
    await waitFor(() => expect(screen.getByLabelText('Project notes')).toHaveFocus());
  });
  it('announces success after sending the same inquiry data', async () => {
    vi.mocked(sendInquiry).mockResolvedValue({ ok: true });
    open(); selectScope();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Justin' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'justin@example.com' } });
    submit();
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Inquiry sent.'));
    expect(sendInquiry).toHaveBeenCalledWith({ data: { name: 'Justin', email: 'justin@example.com', scope: ['Development'], notes: '', company: '' } });
  });
});