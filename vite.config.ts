import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { handleContact } from './api/contact';

// Serves the Vercel function at /api/contact during `npm run dev`,
// so the contact form works locally without the Vercel CLI.
function devContactApi(env: Record<string, string>): Plugin {
  return {
    name: 'dev-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        const send = (status: number, body: unknown) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(body));
        };

        if (req.method !== 'POST') return send(405, { success: false, error: 'Method not allowed' });

        let raw = '';
        req.on('data', chunk => { raw += chunk; });
        req.on('end', async () => {
          let body: unknown = {};
          try { body = JSON.parse(raw || '{}'); } catch { /* handled by validation */ }
          const result = await handleContact(body, env);
          send(result.status, result.body);
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), devContactApi(env)],
    base: '/',
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
  };
});
