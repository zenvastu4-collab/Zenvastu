// Supabase Edge Function: create-cashfree-order
// Creates a Cashfree order server-side and returns the payment_session_id
// Required env vars: CASHFREE_APP_ID, CASHFREE_SECRET_KEY

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      order_id,
      order_ref,
      amount,
      customer_name,
      customer_email,
      customer_phone,
    } = await req.json();

    if (!order_id || !amount || !customer_phone) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: order_id, amount, customer_phone",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const appId =
      Deno.env.get("CASHFREE_APP_ID") ||
      Deno.env.get("CASHFREE_CLIENT_ID");
    const secretKey =
      Deno.env.get("CASHFREE_SECRET_KEY") ||
      Deno.env.get("CASHFREE_API_KEY");
    const mode = (Deno.env.get("CASHFREE_MODE") || "production").toLowerCase();

    if (!appId || !secretKey) {
      return new Response(
        JSON.stringify({
          error: "Cashfree credentials not configured. Please set CASHFREE_APP_ID and CASHFREE_SECRET_KEY in Supabase Edge Function secrets.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Use sandbox or production API based on mode
    const apiBase = mode === "sandbox"
      ? "https://sandbox.cashfree.com/pg/orders"
      : "https://api.cashfree.com/pg/orders";

    const cfPayload = {
      order_id: order_ref || order_id,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: order_id,
        customer_name: customer_name || "Customer",
        customer_email: customer_email || "customer@zenvastu.in",
        customer_phone: customer_phone,
      },
      order_meta: {
        notify_url: null,
      },
    };

    const cfResponse = await fetch(apiBase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      body: JSON.stringify(cfPayload),
    });

    const cfData = await cfResponse.json();

    if (!cfResponse.ok || !cfData.payment_session_id) {
      console.error("Cashfree order creation failed:", cfData);
      return new Response(
        JSON.stringify({
          error:
            cfData.message ||
            "Failed to create Cashfree order. Please try again.",
        }),
        {
          status: cfResponse.status || 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        payment_session_id: cfData.payment_session_id,
        cf_order_id: cfData.cf_order_id,
        order_id: cfData.order_id,
        order_status: cfData.order_status,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
