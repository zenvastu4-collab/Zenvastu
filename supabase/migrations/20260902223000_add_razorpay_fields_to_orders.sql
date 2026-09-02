-- Add Razorpay payment tracking columns to public.orders
alter table public.orders
  add column if not exists razorpay_payment_id text default null,
  add column if not exists razorpay_order_id text default null,
  add column if not exists razorpay_signature text default null;

-- Index for searching orders by Razorpay payment ID
create index if not exists orders_razorpay_payment_id_idx on public.orders (razorpay_payment_id);
