# Deploying to AWS (S3 + CloudFront + Lambda)

```
                       ┌──────────────── CloudFront (HTTPS, theserenityhaven.in) ───────────────┐
visitor ──► https ──►  │  /api/*  ──► Lambda Function URL  (serenity-haven-contact → Brevo)      │
                       │  /*      ──► S3 bucket            (theserenityhaven-site, private)      │
                       └─────────────────────────────────────────────────────────────────────────┘
```

You do steps 1–6 **once** in the AWS Console. After that every update is one command:

```bash
npm run deploy:aws
```

Use region **Asia Pacific (Mumbai) `ap-south-1`** for S3 and Lambda, except the
certificate in step 3, which **must** be in **US East (N. Virginia) `us-east-1`**.

---

## 1. S3 bucket (stores the website)

S3 → **Create bucket**
- Name: `theserenityhaven-site` (no dots). If the name is taken, pick another
  and put it in `aws/deploy.config.json` → `"bucket"`.
- Region: `ap-south-1`
- **Block all public access: ON** (leave the default). CloudFront reads it privately.
- Everything else default → **Create bucket**.

## 2. Lambda function (the contact form)

1. Build the package on your computer:
   ```bash
   npm run build:lambda      # → dist-lambda/serenity-haven-contact.zip
   ```
2. Lambda → **Create function** → *Author from scratch*
   - Name: `serenity-haven-contact`
   - Runtime: **Node.js 22.x**, Architecture: **arm64**
   - **Create function**
3. **Code** tab → **Upload from → .zip file** → choose
   `dist-lambda/serenity-haven-contact.zip`. Handler stays `index.handler`.
4. **Configuration → General configuration → Edit**: Timeout **15 sec**,
   Memory **256 MB**. (The default 3 s is too short for sending two emails.)
5. **Configuration → Environment variables → Edit**, add:

   | Key               | Value                                   |
   | ----------------- | --------------------------------------- |
   | `BREVO_API_KEY`   | your Brevo key (from `.env`)            |
   | `EMAIL_USER`      | `serenityhavensupport@gmail.com`        |
   | `RECIPIENT_EMAIL` | `serenityhavensupport@gmail.com`        |
   | `ORIGIN_SECRET`   | a long random string you make up, e.g. 40 random letters/numbers |

   `ORIGIN_SECRET` makes the function reject anything that didn't come through
   your CloudFront (step 4 adds it as a header).
6. **Configuration → Function URL → Create function URL**
   - Auth type: **NONE**. Leave CORS off (same domain, not needed).
   - Save, then copy the URL. You'll need just the host, e.g.
     `abc123xyz.lambda-url.ap-south-1.on.aws` (no `https://`, no trailing `/`).

## 3. DNS + HTTPS certificate

### 3a. Move DNS to Route 53 (recommended)

CloudFront needs an *alias* record on the bare domain `theserenityhaven.in`,
which GoDaddy can't do. Route 53 can (≈ $0.50/month). Your domain stays
registered at GoDaddy; you only change who answers DNS.

1. Route 53 → **Hosted zones → Create hosted zone** → `theserenityhaven.in`,
   Public → Create.
2. Open it and copy the 4 **NS** values (like `ns-123.awsdns-45.com`).
3. GoDaddy → **My Products → theserenityhaven.in → DNS → Nameservers → Change →
   "I'll use my own nameservers"** → paste the 4 values (without trailing dots) → Save.
4. If you had other records in GoDaddy (e.g. email on this domain), re-create
   them in Route 53. Old Render records are no longer needed.

The switch usually takes under an hour (can take up to 48h).

### 3b. Certificate (free)

Switch the console region to **US East (N. Virginia) us-east-1** →
Certificate Manager → **Request → Request a public certificate**
- Domain names: `theserenityhaven.in` **and** `www.theserenityhaven.in`
- Validation: **DNS** → Request.
- Open the certificate → **Create records in Route 53** → Create.
- Wait for status **Issued** (a few minutes once nameservers have switched).

## 4. CloudFront distribution

CloudFront → **Create distribution**

**Origin**
- Origin domain: pick the S3 bucket `theserenityhaven-site.s3.ap-south-1.amazonaws.com`
  from the list (not a "website" endpoint).
- Origin access: **Origin access control settings (recommended)** →
  **Create new OAC** → defaults → Create.

**Default cache behavior**
- Viewer protocol policy: **Redirect HTTP to HTTPS**
- Cache policy: **CachingOptimized**
- Response headers policy: **SecurityHeadersPolicy**
- Compress objects automatically: **Yes**

**Web Application Firewall**: *Do not enable security protections* (WAF is a paid add-on).

**Settings**
- Price class: **Use North America, Europe, Asia, Middle East, and Africa** (includes India).
- Alternate domain names: `theserenityhaven.in` and `www.theserenityhaven.in`
- Custom SSL certificate: choose the one from step 3b.
- Default root object: `index.html`

→ **Create distribution**. Then:

1. **Allow CloudFront to read the bucket.** A yellow banner offers a bucket
   policy → **Copy policy** → S3 → your bucket → **Permissions → Bucket policy →
   Edit** → paste → Save.
2. **Add the Lambda origin.** Distribution → **Origins → Create origin**
   - Origin domain: the Function URL host from step 2.6
   - Protocol: **HTTPS only**
   - **Add custom header**: Name `x-origin-verify`, Value = your `ORIGIN_SECRET`
   - Create.
3. **Route `/api/*` to Lambda.** **Behaviors → Create behavior**
   - Path pattern: `/api/*`
   - Origin: the Lambda origin
   - Viewer protocol policy: **Redirect HTTP to HTTPS**
   - Allowed HTTP methods: **GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE**
   - Cache policy: **CachingDisabled**
   - Origin request policy: **AllViewerExceptHostHeader** ← required; Lambda
     URLs reject the wrong Host header
   - Create.
4. *(Optional)* **Error pages → Create custom error response**: 403 →
   Customize → `/index.html`, response code 200. Mistyped URLs then show the
   site instead of an XML error.
5. Copy the **Distribution ID** (e.g. `E1ABC2DEF3GHIJ`) into
   `aws/deploy.config.json` → `"distributionId"`.

## 5. Point the domain at CloudFront

Route 53 → hosted zone `theserenityhaven.in` → **Create record**, four times:

| Record name | Type   | Alias | Route traffic to                         |
| ----------- | ------ | ----- | ---------------------------------------- |
| *(empty)*   | A      | Yes   | Alias to CloudFront distribution → yours |
| *(empty)*   | AAAA   | Yes   | same                                     |
| `www`       | A      | Yes   | same                                     |
| `www`       | AAAA   | Yes   | same                                     |

## 6. First deploy

```bash
npm run deploy:aws
```

This builds the site, uploads it to S3 with the right cache headers, clears the
CloudFront cache, and uploads the Lambda code. Open
**https://theserenityhaven.in** and send a test message from **Contact Us**.

The AWS CLI user needs permission for `s3:ListBucket`, `s3:PutObject`,
`s3:DeleteObject` on the bucket, `cloudfront:CreateInvalidation`, and
`lambda:UpdateFunctionCode`.

---

## Everyday use

| Command                          | Does                         |
| -------------------------------- | ---------------------------- |
| `npm run deploy:aws`             | Site + contact Lambda        |
| `npm run deploy:aws -- --site`   | Website only (most changes)  |
| `npm run deploy:aws -- --lambda` | Contact form code only       |

New Brevo key or email address? Lambda → Configuration → Environment variables
(no redeploy needed).

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Site shows **AccessDenied** XML | Bucket policy from step 4.1 missing, or files not uploaded yet (`npm run deploy:aws -- --site`). |
| Form: "couldn't send your message" | Lambda → **Monitor → View CloudWatch logs**. `Brevo 401` = wrong key or Brevo IP blocking on (Brevo → Security → Authorised IPs → turn off). `Missing BREVO_API_KEY` = env vars in step 2.5. |
| Form returns **403 Forbidden** | `x-origin-verify` header on the CloudFront origin doesn't match `ORIGIN_SECRET`. |
| `/api/contact` returns **403** from CloudFront | Origin request policy isn't **AllViewerExceptHostHeader**, or POST isn't in allowed methods. |
| Certificate stuck on *Pending* | Nameservers haven't switched yet; check with `nslookup -type=NS theserenityhaven.in`. |
| Changes not showing | Deploy clears the cache automatically; hard-refresh the browser (Ctrl+F5). |

## Rough monthly cost

CloudFront (1 TB + 10M requests/month free), Lambda (1M requests/month free),
S3 (a few rupees) and the certificate (free) are ≈ ₹0 at this traffic.
Route 53 hosted zone ≈ $0.50/month.

## Option B: keep GoDaddy DNS (no Route 53)

Possible, with a trade-off. Skip 3a; in 3b add the validation CNAMEs manually in
GoDaddy DNS. Then in GoDaddy:
- CNAME `www` → your `dxxxxxxxx.cloudfront.net` domain.
- **Forwarding**: forward `theserenityhaven.in` → `https://www.theserenityhaven.in` (permanent 301).

`www.theserenityhaven.in` works perfectly, but GoDaddy's forwarding doesn't
support HTTPS on the bare domain, so `https://theserenityhaven.in` (typed
without `www`) may show a browser warning. Also change the
`https://theserenityhaven.in/` URLs in `index.html` to `https://www.theserenityhaven.in/`.
