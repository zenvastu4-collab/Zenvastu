declare module '@cashfreepayments/cashfree-js' {
  interface LoadOptions {
    mode: 'sandbox' | 'production';
  }

  interface CheckoutOptions {
    paymentSessionId: string;
    returnUrl?: string;
    redirectTarget?: string;
  }

  interface CheckoutResult {
    error?: {
      message: string;
      code?: string;
    };
    redirect?: boolean;
    paymentDetails?: Record<string, any>;
  }

  interface CashfreeInstance {
    checkout(options: CheckoutOptions): Promise<CheckoutResult>;
  }

  export function load(options: LoadOptions): Promise<CashfreeInstance>;
}
