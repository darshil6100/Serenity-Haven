# The Serenity Haven — Setup & Deployment

A React + Vite + Tailwind site. Contact-form enquiries are emailed through
[Brevo](https://www.brevo.com/). Live at **https://theserenityhaven.in** (hosted on Render).

```
src/             React app (pages are routed by URL hash: #packages, #contact, #retreat)
api/contact.ts   Contact handler — validates the form and sends emails via Brevo
server/index.ts  Production server for Render: serves dist/ + POST /api/contact
render.yaml      Render Blueprint (one web service)
aws/             AWS Lambda entry + deploy settings (see AWS_DEPLOY.md)
scripts/         build-lambda / deploy-aws helpers
public/          Static files (favicon, retreat brochure images)
```

## 1. Run locally

```bash
npm install
cp .env.example .env     # then fill in the three values
npm run dev              # http://localhost:5173
```

`npm run dev` also serves `/api/contact`, so the contact form works locally.
Without a `.env` the site runs fine, but the form shows a friendly
"service unavailable" message with your phone and email.

## 2. Set up Brevo (free: 300 emails/day)

1. Create an account at https://www.brevo.com.
2. **Senders, Domains & Dedicated IPs → Senders**: add and verify the address you
   want emails to come from (e.g. `serenityhavensupport@gmail.com`).
3. **SMTP & API → API Keys**: create a key (it starts with `xkeysib-`).

| Variable          | Value                                       |
| ----------------- | ------------------------------------------- |
| `BREVO_API_KEY`   | The API key from step 3                     |
| `EMAIL_USER`      | The verified sender address from step 2     |
| `RECIPIENT_EMAIL` | Inbox that should receive new enquiries     |

Each enquiry sends two emails: a notification to `RECIPIENT_EMAIL` (hit **Reply**
to answer the visitor directly) and a confirmation to the visitor.

> Keep these variables **without** a `VITE_` prefix. Anything prefixed `VITE_` is
> bundled into the public JavaScript and anyone could read your API key.

## 3. Deploy to Render

1. Commit and push to the `main` branch on GitHub (the Blueprint deploys `main`).
2. Render dashboard → **New → Blueprint** → connect GitHub → pick this repo.
   Render reads `render.yaml`, asks for `BREVO_API_KEY`, and creates the
   `serenity-haven` web service. First deploy takes a few minutes.
3. Open the `https://serenity-haven….onrender.com` URL Render shows and test the
   contact form.
4. In Brevo → **Security → Authorised IPs**, make sure blocking of unknown IPs is
   **off** — otherwise Render's servers are rejected with a 401.

Every push to `main` redeploys automatically.

**Free vs paid:** on the free plan the service sleeps after 15 minutes without
visitors, and the next visitor waits about a minute while it wakes up. For a
business site, switch the service to the **Starter** plan (Settings → Instance
Type) so it's always instant.

### Connect theserenityhaven.in (GoDaddy)

1. Render → service → **Settings → Custom Domains → Add** `theserenityhaven.in`.
   Render also adds `www.theserenityhaven.in` and redirects it to the main domain.
2. GoDaddy → **My Products → theserenityhaven.in → DNS**, and set:

   | Type  | Name  | Value                                  |
   | ----- | ----- | -------------------------------------- |
   | A     | `@`   | `216.24.57.1`                          |
   | CNAME | `www` | `serenity-haven.onrender.com` (your exact Render URL, without `https://`) |

   Edit the existing `@` A record ("Parked") and `www` CNAME rather than adding
   duplicates. Delete any **AAAA** records and turn off GoDaddy **Forwarding**.
3. Back in Render, click **Verify**. Once DNS propagates (minutes, up to a few
   hours) Render issues a free HTTPS certificate automatically.

### Run the production server locally

```bash
npm run build
npm start            # http://localhost:10000 (reads env vars from the shell, not .env)
```

### Other hosts

**AWS (S3 + CloudFront + Lambda):** see [AWS_DEPLOY.md](AWS_DEPLOY.md) — always on,
near-free at this traffic, deployed with `npm run deploy:aws`.

`api/contact.ts` also works as-is as a Vercel function. Any Node 22+ host can run
`npm run build && npm start`.

## 4. Updating content

| What                         | Where                                        |
| ---------------------------- | -------------------------------------------- |
| Packages, seats, offer dates | `packages` array in `src/components/Packages.tsx` |
| Contact-form package list    | `packageOptions` in `src/components/ContactForm.tsx` |
| Retreat brochure page        | `src/components/WellnessRetreatBrochure.tsx` |
| Phone / email                | `ContactForm.tsx`, `Footer.tsx`, `api/contact.ts` |

`offerEndsAt` drives the "x days left" badge; once it passes, the card shows
"Offer ended" and hides the seats-left badge.

## Scripts

| Command             | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Dev server with the contact API   |
| `npm run build`     | Production build into `dist/`     |
| `npm start`         | Production server (after build)   |
| `npm run build:lambda` | Package the contact Lambda (AWS) |
| `npm run deploy:aws`   | Build + publish to S3/CloudFront/Lambda |
| `npm run preview`   | Serve the production build        |
| `npm run lint`      | ESLint                            |
| `npm run typecheck` | TypeScript check                  |
