import { CONTACT_EMAIL, inquiryToText, type Inquiry } from "@/lib/inquiry";

export function buildMailto(data: Inquiry) {
  const prefix = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New project inquiry from ' + data.name)}&body=`;
  const characters = Array.from(inquiryToText(data));
  let low = 0;
  let high = characters.length;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (prefix.length + encodeURIComponent(characters.slice(0, middle).join('')).length < 1800) low = middle;
    else high = middle - 1;
  }
  return prefix + encodeURIComponent(characters.slice(0, low).join(''));
}