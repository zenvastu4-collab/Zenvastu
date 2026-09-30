// Vercel Serverless Function: /api/create-cashfree-order
// Creates a Cashfree PG order and returns payment_session_id

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      order_id,
      order_ref,
      amount,
      customer_name,
      customer_email,
      customer_phone,
    } = req.body || {};

    if (!order_id || !amount || !customer_phone) {
      return res.status(400).json({
        error: 'Missing required fields: order_id, amount, customer_phone',
      });
    }

    const appId =
      process.env.CASHFREE_APP_ID ||
      process.env.VITE_CASHFREE_APP_ID;

    const secretKey =
      process.env.CASHFREE_SECRET_KEY ||
      process.env.VITE_CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return res.status(500).json({
        error: 'Cashfree credentials not configured. Please set CASHFREE_APP_ID and CASHFREE_SECRET_KEY.',
      });
    }

    const mode = (
      process.env.CASHFREE_MODE ||
      process.env.VITE_CASHFREE_MODE ||
      'production'
    ).toLowerCase();

    const apiBase =
      mode === 'sandbox'
        ? 'https://sandbox.cashfree.com/pg/orders'
        : 'https://api.cashfree.com/pg/orders';

    const cfPayload = {
      order_id: (order_ref || order_id).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 45),
      order_amount: Number(amount),
      order_currency: 'INR',
      customer_details: {
        customer_id: String(order_id).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 45),
        customer_name: customer_name || 'Zen Vastu Customer',
        customer_email: customer_email || 'client@zenvastu.in',
        customer_phone: String(customer_phone).replace(/\D/g, '').slice(-10),
      },
      order_meta: {
        notify_url: null,
      },
    };

    const cfResponse = await fetch(apiBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': appId,
        'x-client-secret': secretKey,
      },
      body: JSON.stringify(cfPayload),
    });

    const cfData = await cfResponse.json();

    if (!cfResponse.ok || !cfData.payment_session_id) {
      console.error('Cashfree API error:', cfData);
      return res.status(cfResponse.status || 500).json({
        error: cfData.message || 'Failed to create Cashfree order',
      });
    }

    return res.status(200).json({
      payment_session_id: cfData.payment_session_id,
      cf_order_id: cfData.cf_order_id,
      order_id: cfData.order_id,
      order_status: cfData.order_status,
    });
  } catch (error) {
    console.error('Serverless error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
