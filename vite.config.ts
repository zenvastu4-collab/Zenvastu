import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'cashfree-dev-api',
        configureServer(server) {
          server.middlewares.use('/api/create-cashfree-order', async (req, res) => {
            if (req.method === 'OPTIONS') {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
              res.statusCode = 200;
              res.end();
              return;
            }

            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body || '{}');
                const appId =
                  env.VITE_CASHFREE_APP_ID ||
                  process.env.VITE_CASHFREE_APP_ID ||
                  process.env.CASHFREE_APP_ID;
                const secretKey =
                  env.VITE_CASHFREE_SECRET_KEY ||
                  process.env.VITE_CASHFREE_SECRET_KEY ||
                  process.env.CASHFREE_SECRET_KEY;

                if (!appId || !secretKey) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      error:
                        'Cashfree credentials not configured. Please set VITE_CASHFREE_APP_ID and VITE_CASHFREE_SECRET_KEY in .env',
                    })
                  );
                  return;
                }

                const cfMode = (
                  env.VITE_CASHFREE_MODE || 'production'
                ).toLowerCase();
                const apiBase =
                  cfMode === 'sandbox'
                    ? 'https://sandbox.cashfree.com/pg/orders'
                    : 'https://api.cashfree.com/pg/orders';

                const orderId = (data.order_ref || data.order_id || `ORDER_${Date.now()}`)
                  .replace(/[^a-zA-Z0-9_-]/g, '_')
                  .slice(0, 45);

                const cfResponse = await fetch(apiBase, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-api-version': '2023-08-01',
                    'x-client-id': appId,
                    'x-client-secret': secretKey,
                  },
                  body: JSON.stringify({
                    order_id: orderId,
                    order_amount: Number(data.amount),
                    order_currency: 'INR',
                    customer_details: {
                      customer_id: String(data.order_id || `CUST_${Date.now()}`)
                        .replace(/[^a-zA-Z0-9_-]/g, '_')
                        .slice(0, 45),
                      customer_name: data.customer_name || 'Zen Vastu Customer',
                      customer_email: data.customer_email || 'client@zenvastu.in',
                      customer_phone: String(data.customer_phone || '9999999999')
                        .replace(/\D/g, '')
                        .slice(-10),
                    },
                  }),
                });

                const cfData = await cfResponse.json();
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.statusCode = cfResponse.status || 200;
                res.end(JSON.stringify(cfData));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({ error: err.message || 'Internal server error' })
                );
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
