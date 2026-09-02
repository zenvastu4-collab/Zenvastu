import pg from 'pg';
import fs from 'fs';

const client = new pg.Client({
  host: '2406:da12:557:f800:2880:b288:ed6c:587e',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.ZV_DB_PASS,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
const sql = fs.readFileSync(new URL('./.seed.sql', import.meta.url), 'utf8');
await client.query(sql);
const counts = await client.query(`
  select
    (select count(*) from public.site_copy) as copy,
    (select count(*) from public.products) as products,
    (select count(*) from public.directions) as directions,
    (select count(*) from public.elements) as elements,
    (select count(*) from public.consultations) as consultations,
    (select count(*) from public.journal_articles) as journal,
    (select count(*) from public.testimonials) as testimonials,
    (select count(*) from public.coupons) as coupons
`);
console.log(JSON.stringify(counts.rows[0]));
await client.end();
