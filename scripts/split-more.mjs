import fs from 'fs';

function split(sourceFile, prefix, conflictSql) {
  const sql = fs.readFileSync(new URL(sourceFile, import.meta.url), 'utf8');
  const match = sql.match(/jsonb_to_recordset\(\('(.*)'::jsonb\)\)/s);
  if (!match) throw new Error('no json in ' + sourceFile);
  const rows = JSON.parse(match[1]);
  const insertLine = sql.match(/^insert into public\.\w+ \([^)]+\)/)[0];
  const selectLine = sql.match(/select [^\n]+/)[0];
  const xdef = sql.match(/as x\(([\s\S]+?)\)\s*(?:on conflict|where)/)[1];
  rows.forEach((row, index) => {
    const json = JSON.stringify(row).replaceAll("'", "''");
    const query = `${insertLine}
${selectLine}
from jsonb_to_record(('${json}'::jsonb)) as x(${xdef})
${conflictSql}`;
    fs.writeFileSync(new URL(`./${prefix}-${index}.sql`, import.meta.url), query);
  });
  console.log(prefix, rows.length);
}

split(
  './.chunk-07.sql',
  '.dir',
  `on conflict (code) do update set
  name = excluded.name, sanskrit_name = excluded.sanskrit_name, ruling_deity = excluded.ruling_deity, ruling_planet = excluded.ruling_planet,
  element = excluded.element, color_hex = excluded.color_hex, bg_gradient = excluded.bg_gradient, key_benefits = excluded.key_benefits,
  ideal_for = excluded.ideal_for, avoid_here = excluded.avoid_here, remedy_tips = excluded.remedy_tips,
  recommended_products = excluded.recommended_products, sort_order = excluded.sort_order, published = excluded.published;`
);

split(
  './.chunk-01.sql',
  '.copy',
  `on conflict (page, field_key) do update set
  section = excluded.section, label = excluded.label, value = excluded.value,
  field_type = excluded.field_type, sort_order = excluded.sort_order;`
);
