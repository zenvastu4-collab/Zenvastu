import { load } from '@cashfreepayments/cashfree-js';

export interface CashfreePaymentResponse {
  paymentSessionId: string;
  orderId: string;
  orderStatus?: string;
}

export interface CashfreeCheckoutOptions {
  /** The payment session ID from the backend order-creation call */
  paymentSessionId: string;
  /** Return URL with optional {order_id} placeholder */
  returnUrl?: string;
}

let cashfreeInstance: any = null;

/**
 * Initialise the Cashfree JS SDK (singleton).
 * Uses production mode by default; set VITE_CASHFREE_MODE=sandbox for testing.
 */
async function getCashfree() {
  if (cashfreeInstance) return cashfreeInstance;

  const mode =
    (import.meta.env.VITE_CASHFREE_MODE as string) || 'production';

  cashfreeInstance = await load({ mode: mode as 'sandbox' | 'production' });
  return cashfreeInstance;
}

/**
 * Open the Cashfree drop-in checkout.
 * Returns a Promise that resolves once payment completes or rejects on error.
 */
export async function openCashfreeCheckout(
  options: CashfreeCheckoutOptions
): Promise<{ paymentCompleted: boolean }> {
  const cashfree = await getCashfree();

  if (!cashfree) {
    throw new Error(
      'Could not load Cashfree payment gateway. Please check your internet connection and try again.'
    );
  }

  const checkoutOptions: Record<string, any> = {
    paymentSessionId: options.paymentSessionId,
  };

  if (options.returnUrl) {
    checkoutOptions.returnUrl = options.returnUrl;
  }

  const result = await cashfree.checkout(checkoutOptions);

  if (result.error) {
    throw new Error(
      result.error.message || 'Payment failed. Please try again.'
    );
  }

  if (result.paymentDetails) {
    return { paymentCompleted: true };
  }

  // Redirect flow – treated as success (verified server-side via webhook)
  if (result.redirect) {
    return { paymentCompleted: true };
  }

  throw new Error('Payment could not be completed. Please try again.');
}

/**
 * Create a Cashfree order server-side and retrieve `payment_session_id`.
 * Supports both local/Vercel serverless (/api/create-cashfree-order)
 * and Supabase Edge Function (/functions/v1/create-cashfree-order).
 */
export async function createCashfreeOrder(payload: {
  orderId: string;
  orderRef: string;
  amount: number; // in ₹ (not paise)
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}): Promise<{ paymentSessionId: string; cfOrderId: string }> {
  const bodyPayload = JSON.stringify({
    order_id: payload.orderId,
    order_ref: payload.orderRef,
    amount: payload.amount,
    customer_name: payload.customerName,
    customer_email: payload.customerEmail,
    customer_phone: payload.customerPhone,
  });

  // 1. Try local/Vercel API endpoint first
  try {
    const apiRes = await fetch('/api/create-cashfree-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyPayload,
    });

    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.payment_session_id) {
        return {
          paymentSessionId: data.payment_session_id,
          cfOrderId: data.cf_order_id || payload.orderId,
        };
      }
    }
  } catch (e) {
    console.warn('Local/Vercel API attempt failed, trying Supabase Edge Function...', e);
  }

  // 2. Fallback to Supabase Edge Function
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/create-cashfree-order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseAnonKey}`,
          apikey: supabaseAnonKey,
        },
        body: bodyPayload,
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.payment_session_id) {
        return {
          paymentSessionId: data.payment_session_id,
          cfOrderId: data.cf_order_id || payload.orderId,
        };
      }
    }

    const errorData = await response.json().catch(() => ({}));
    if (errorData.error || errorData.message) {
      throw new Error(errorData.error || errorData.message);
    }
  }

  throw new Error(
    'Failed to create payment session with Cashfree. Please verify your internet connection or choose Cash on Delivery.'
  );
}
