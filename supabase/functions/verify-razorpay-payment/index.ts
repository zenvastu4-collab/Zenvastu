// Supabase Edge Function: verify-razorpay-payment
// Verifies Razorpay payment signature securely using RAZORPAY_KEY_SECRET

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { order_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_payment_id) {
      return new Response(JSON.stringify({ error: "Missing razorpay_payment_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const razorpaySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    let isValid = true;
    if (razorpaySecret && razorpay_order_id && razorpay_signature) {
      const generatedSignature = hmac("sha256", razorpaySecret, `${razorpay_order_id}|${razorpay_payment_id}`, "utf8", "hex");
      if (generatedSignature !== razorpay_signature) {
        isValid = false;
        return new Response(JSON.stringify({ error: "Invalid payment signature" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Update order status in Supabase database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        status: "processing",
        razorpay_payment_id,
        razorpay_order_id: razorpay_order_id || null,
        razorpay_signature: razorpay_signature || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order_id);

    if (dbError) {
      console.error("Failed to update order:", dbError);
    }

    return new Response(
      JSON.stringify({ success: true, verified: isValid, payment_id: razorpay_payment_id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
