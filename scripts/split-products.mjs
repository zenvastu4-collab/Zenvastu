import fs from 'fs';

const sql = fs.readFileSync(new URL('./.chunk-06.sql', import.meta.url), 'utf8');
const match = sql.match(/jsonb_to_recordset\(\('(.*)'::jsonb\)\)/s);
if (!match) throw new Error('Could not parse products JSON');
const products = JSON.parse(match[1]);

for (const [index, product] of products.entries()) {
  const json = JSON.stringify(product).replaceAll("'", "''");
  const query = `insert into public.products (id, slug, name, subtitle, price, original_price, image, category, element, element_color, description, symbolism, quote, vastu_placement, dimensions, material, in_stock, rating, reviews_count, sort_order, published)
select id, slug, name, subtitle, price, original_price, image, category, element, element_color, description, symbolism, quote, vastu_placement, dimensions, material, in_stock, rating, reviews_count, sort_order, published
from jsonb_to_record(('${json}'::jsonb)) as x(
  id text, slug text, name text, subtitle text, price numeric, original_price numeric, image text, category text, element text, element_color text,
  description text, symbolism jsonb, quote text, vastu_placement text, dimensions text, material text, in_stock boolean, rating numeric, reviews_count int, sort_order int, published boolean
)
on conflict (id) do update set
  slug = excluded.slug, name = excluded.name, subtitle = excluded.subtitle, price = excluded.price, original_price = excluded.original_price,
  image = excluded.image, category = excluded.category, element = excluded.element, element_color = excluded.element_color,
  description = excluded.description, symbolism = excluded.symbolism, quote = excluded.quote, vastu_placement = excluded.vastu_placement,
  dimensions = excluded.dimensions, material = excluded.material, in_stock = excluded.in_stock, rating = excluded.rating,
  reviews_count = excluded.reviews_count, sort_order = excluded.sort_order, published = excluded.published;`;
  fs.writeFileSync(new URL(`./.prod-${index}.sql`, import.meta.url), query);
  console.log(index, product.id, query.length);
}
