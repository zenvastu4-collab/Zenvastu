export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayCheckoutOptions {
  key?: string;
  amount: number; // in paise (e.g. ₹100 = 10000)
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    confirm_close?: boolean;
  };
  handler?: (response: RazorpayPaymentSuccessResponse) => void;
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById('razorpay-checkout-js');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-js';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Open Razorpay Standard Checkout modal and return a Promise that resolves on successful payment.
 */
export async function openRazorpayCheckout(
  options: RazorpayCheckoutOptions
): Promise<RazorpayPaymentSuccessResponse> {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !window.Razorpay) {
    throw new Error('Could not load Razorpay payment gateway. Please check your internet connection and try again.');
  }

  const key = options.key || import.meta.env.VITE_RAZORPAY_KEY_ID;
  if (!key) {
    throw new Error('Razorpay Key ID is not configured.');
  }

  return new Promise((resolve, reject) => {
    let paymentCompleted = false;

    const razorpayOptions: any = {
      key,
      amount: Math.round(options.amount),
      currency: options.currency || 'INR',
      name: options.name || 'Zen Vastu',
      description: options.description || 'Sacred Living Order',
      image: options.image || 'https://zenvastu.in/favicon.ico',
      prefill: options.prefill || {},
      notes: options.notes || {},
      theme: {
        color: options.theme?.color || '#1B382B', // Zen Vastu forest green
      },
      modal: {
        confirm_close: true,
        ondismiss: () => {
          if (!paymentCompleted) {
            options.modal?.ondismiss?.();
            reject(new Error('Payment was cancelled by customer.'));
          }
        },
      },
      handler: (response: RazorpayPaymentSuccessResponse) => {
        paymentCompleted = true;
        options.handler?.(response);
        resolve(response);
      },
    };

    if (options.order_id) {
      razorpayOptions.order_id = options.order_id;
    }

    const rzp = new window.Razorpay(razorpayOptions);

    rzp.on('payment.failed', (response: any) => {
      paymentCompleted = true;
      const errorMsg = response?.error?.description || response?.error?.reason || 'Payment failed. Please try again.';
      reject(new Error(errorMsg));
    });

    rzp.open();
  });
}
