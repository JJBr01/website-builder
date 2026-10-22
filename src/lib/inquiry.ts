import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Where inquiries land. Change this in one place if the domain or inbox changes.
export const CONTACT_EMAIL = "hello@mod12.co";

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  scope: z.array(z.string().max(50)).min(1, "Pick at least one scope.").max(10),
  budget: z.string().max(50).optional(),
  timeline: z.string().max(50).optional(),
  notes: z.string().trim().max(1000, "Notes must be under 1000 characters.").optional(),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(200).optional(),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export type InquiryResult = { ok: true } | { ok: false; reason: "not_configured" | "send_failed" };

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export function inquiryToText(i: Inquiry) {
  return [
    `Name: ${i.name}`,
    `Email: ${i.email}`,
    `Scope: ${i.scope.join(", ")}`,
    `Budget: ${i.budget || "-"}`,
    `Timeline: ${i.timeline || "-"}`,
    "",
    i.notes || "(no notes)",
  ].join("\n");
}

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }): Promise<InquiryResult> => {
    // Bots fill hidden fields. Pretend it worked and drop it.
    if (data.company) return { ok: true };

    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) return { ok: false, reason: "not_configured" };

    const from = process.env["INQUIRY_FROM_EMAIL"] || "MOD 12 <onboarding@resend.dev>";
    const to = process.env["INQUIRY_TO_EMAIL"] || CONTACT_EMAIL;
    const text = inquiryToText(data);

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: data.email,
          subject: `New project inquiry from ${data.name}`,
          text,
          html: `<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
        }),
      });
      if (!res.ok) {
        console.error("Resend error", res.status, await res.text());
        return { ok: false, reason: "send_failed" };
      }
      return { ok: true };
    } catch (error) {
      console.error("Inquiry send failed", error);
      return { ok: false, reason: "send_failed" };
    }
  });
