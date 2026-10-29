// AWS Lambda entry point for POST /api/contact (behind a Lambda Function URL,
// which CloudFront routes /api/* to). Bundled by `npm run build:lambda`.
//
// Lambda settings: runtime Node.js 22.x, handler `index.handler`, timeout 15s.
// Environment variables: BREVO_API_KEY, EMAIL_USER, RECIPIENT_EMAIL, and
// optionally ORIGIN_SECRET (see below).

import { handleContact, type ContactEnv } from '../api/contact.ts';

// Shape of a Lambda Function URL (payload v2.0) event — only the fields we use.
interface FunctionUrlEvent {
  headers?: Record<string, string | undefined>;
  body?: string;
  isBase64Encoded?: boolean;
  requestContext?: { http?: { method?: string } };
}

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

export async function handler(event: FunctionUrlEvent) {
  // If ORIGIN_SECRET is set, only accept requests that came through CloudFront
  // (which adds this header), not direct hits on the public Function URL.
  const secret = process.env.ORIGIN_SECRET;
  if (secret && event.headers?.['x-origin-verify'] !== secret) {
    return json(403, { success: false, error: 'Forbidden' });
  }

  if (event.requestContext?.http?.method !== 'POST') {
    return json(405, { success: false, error: 'Method not allowed' });
  }

  let body: unknown = {};
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body ?? '', 'base64').toString('utf8') : event.body;
    body = JSON.parse(raw || '{}');
  } catch {
    return json(400, { success: false, error: 'Invalid request' });
  }

  const result = await handleContact(body, process.env as ContactEnv);
  return json(result.status, result.body);
}
