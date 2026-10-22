# MOD 12 website

Marketing site for MOD 12, an independent digital studio.

## Inquiry form email

The "Start a project" form sends through [Resend](https://resend.com). Set these environment variables wherever the site is hosted:

- `RESEND_API_KEY` (required): API key from Resend.
- `INQUIRY_FROM_EMAIL` (optional): sender, e.g. `MOD 12 <site@mod12.co>`. Needs a domain verified in Resend. Defaults to Resend's test sender.
- `INQUIRY_TO_EMAIL` (optional): where inquiries go. Defaults to `CONTACT_EMAIL` in `src/lib/inquiry.ts`.

Without `RESEND_API_KEY`, the form still works: it shows visitors a prefilled email link so no inquiry is lost.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/73e0b178-7cc0-42c9-982e-49f9d2ac1e90).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
