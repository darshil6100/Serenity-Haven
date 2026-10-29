// Production server for Render (or any Node host).
//
// Serves the built site from `dist/` and handles POST /api/contact using the
// same handler as the Vercel function and the Vite dev server.
//
//   npm run build && npm start      → http://localhost:10000
//
// Runs directly on Node 22+ via --experimental-strip-types (no build step).

import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { handleContact, type ContactEnv } from '../api/contact.ts';

const PORT = Number(process.env.PORT) || 10000;
const DIST = resolve(import.meta.dirname, '..', 'dist');
const MAX_BODY_BYTES = 50 * 1024;

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
};

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { ...SECURITY_HEADERS, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolveBody, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function handleApi(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { success: false, error: 'Method not allowed' });
  }

  let body: unknown = {};
  try {
    body = JSON.parse((await readBody(req)) || '{}');
  } catch {
    return sendJson(res, 400, { success: false, error: 'Invalid request' });
  }

  const result = await handleContact(body, process.env as ContactEnv);
  sendJson(res, result.status, result.body);
}

async function serveStatic(req: IncomingMessage, res: ServerResponse, pathname: string) {
  // Resolve inside dist/ only — never let "../" escape it.
  const requested = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '');
  let filePath = join(DIST, requested);
  if (filePath !== DIST && !filePath.startsWith(DIST + sep)) {
    res.writeHead(400, SECURITY_HEADERS);
    return res.end('Bad request');
  }

  try {
    if ((await stat(filePath)).isDirectory()) filePath = join(filePath, 'index.html');
  } catch {
    // Unknown path → the app shell (routing happens client-side via #hash).
    filePath = join(DIST, 'index.html');
  }

  try {
    const data = await readFile(filePath);
    const ext = extname(filePath).toLowerCase();
    // Hashed build assets never change; everything else must revalidate.
    const cache = filePath.includes(`${sep}assets${sep}`)
      ? 'public, max-age=31536000, immutable'
      : ext === '.html' ? 'no-cache' : 'public, max-age=86400';

    res.writeHead(200, {
      ...SECURITY_HEADERS,
      'Content-Type': MIME[ext] ?? 'application/octet-stream',
      'Content-Length': data.length,
      'Cache-Control': cache,
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(404, SECURITY_HEADERS);
    res.end('Not found');
  }
}

const server = createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url ?? '/', 'http://localhost');

    if (pathname === '/healthz') return sendJson(res, 200, { ok: true });
    if (pathname === '/api/contact') return await handleApi(req, res);
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, SECURITY_HEADERS);
      return res.end('Method not allowed');
    }
    await serveStatic(req, res, pathname);
  } catch (err) {
    console.error('[server] Unhandled error:', err);
    if (!res.headersSent) sendJson(res, 500, { success: false, error: 'Server error' });
    else res.end();
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`The Serenity Haven is running on port ${PORT}`);
});
