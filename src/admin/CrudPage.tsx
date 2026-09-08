import { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { asStringArray } from '../lib/cmsTypes';
import { ImageField } from './ImageField';
import type { CollectionConfig, FieldConfig } from './collections';
import { useCms } from '../context/CmsProvider';

function emptyRow(config: CollectionConfig) {
  const row: Record<string, unknown> = {};
  for (const field of config.fields) {
    if (field.type === 'boolean') row[field.key] = true;
    else if (field.type === 'number') row[field.key] = 0;
    else if (field.type === 'list') row[field.key] = [];
    else row[field.key] = '';
  }
  if (config.fields.some((f) => f.key === 'id') && !row.id) {
    row.id = `${config.key}-${Date.now()}`;
  }
  return row;
}

function fieldValue(row: Record<string, unknown>, field: FieldConfig) {
  const value = row[field.key];
  if (field.type === 'list') return asStringArray(value).join('\n');
  if (field.type === 'boolean') return Boolean(value);
  if (value == null) return '';
  return value as string | number;
}

function applyField(row: Record<string, unknown>, field: FieldConfig, raw: string | number | boolean) {
  const next = { ...row };
  if (field.type === 'list') {
    next[field.key] = String(raw)
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  } else if (field.type === 'number') {
    next[field.key] = raw === '' ? null : Number(raw);
  } else if (field.type === 'boolean') {
    next[field.key] = Boolean(raw);
  } else {
    next[field.key] = raw;
  }
  return next;
}

export function CrudPage({ config }: { config: CollectionConfig }) {
  const { refresh } = useCms();
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const load = async () => {
    if (!supabase) return;
    const { data } = await supabase.from(config.table).select('*');
    const list = ((data || []) as Record<string, unknown>[]).sort((a, b) => {
      const ao = Number(a.sort_order ?? 0);
      const bo = Number(b.sort_order ?? 0);
      if (ao !== bo) return ao - bo;
      return String(a[config.titleField] || '').localeCompare(String(b[config.titleField] || ''));
    });
    setRows(list);
  };

  useEffect(() => {
    void load();
  }, [config.table]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [rows, query]);

  const save = async () => {
    if (!supabase || !editing) return;
    setSaving(true);
    setError('');
    const payload = { ...editing };
    const { error: saveError } = isNew
      ? await supabase.from(config.table).insert(payload)
      : await supabase.from(config.table).update(payload).eq(config.idField, payload[config.idField]);
    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    setEditing(null);
    setIsNew(false);
    await load();
    await refresh();
  };

  const remove = async (row: Record<string, unknown>) => {
    if (!supabase) return;
    if (!confirm(`Delete this ${config.label.toLowerCase()} item?`)) return;
    await supabase.from(config.table).delete().eq(config.idField, row[config.idField]);
    await load();
    await refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl text-vastu-forest">{config.label}</h1>
          <p className="text-xs text-vastu-muted">{rows.length} records · full create, edit, delete</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="border border-vastu-border rounded px-3 py-2 text-xs bg-white"
          />
          <button
            onClick={() => {
              setEditing(emptyRow(config));
              setIsNew(true);
              setError('');
            }}
            className="inline-flex items-center gap-1.5 bg-vastu-forest text-white px-4 py-2 rounded-sm text-xs font-bold uppercase"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      <div className="bg-white border border-vastu-border rounded-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-vastu-cream/70 text-vastu-muted uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Details</th>
              <th className="px-4 py-3 w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vastu-border/50">
            {filtered.map((row) => (
              <tr key={String(row[config.idField] ?? JSON.stringify(row))} className="hover:bg-vastu-ivoryDark">
                <td className="px-4 py-3 font-semibold text-vastu-forest">
                  {String(row[config.titleField] || row.id || 'Untitled')}
                </td>
                <td className="px-4 py-3 text-vastu-muted truncate max-w-md">
                  {String(row.slug || row.subtitle || row.tagline || row.label || row.code || '')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditing(row);
                        setIsNew(false);
                        setError('');
                      }}
                      className="p-1.5 hover:bg-vastu-cream rounded"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => void remove(row)} className="p-1.5 hover:bg-rose-50 rounded text-rose-700">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-vastu-muted">
                  No records yet. Click Add or seed default content from the dashboard.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto p-4">
          <div className="bg-white max-w-3xl w-full my-8 rounded-sm border border-vastu-border shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-vastu-border bg-vastu-forest text-white">
              <h2 className="font-serif text-lg">{isNew ? 'Create' : 'Edit'} {config.label}</h2>
              <button onClick={() => setEditing(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
              {config.fields.map((field) => (
                <div key={field.key} className={field.type === 'textarea' || field.type === 'list' || field.type === 'image' ? 'sm:col-span-2' : ''}>
                  {field.type === 'image' ? (
                    <ImageField
                      label={field.label}
                      value={String(editing[field.key] || '')}
                      onChange={(url) => setEditing(applyField(editing, field, url))}
                    />
                  ) : field.type === 'boolean' ? (
                    <label className="flex items-center gap-2 text-xs font-sans pt-6">
                      <input
                        type="checkbox"
                        checked={Boolean(editing[field.key])}
                        onChange={(e) => setEditing(applyField(editing, field, e.target.checked))}
                      />
                      {field.label}
                    </label>
                  ) : field.type === 'select' ? (
                    <label className="block text-[11px] uppercase tracking-wider text-vastu-muted mb-1">{field.label}</label>
                  ) : (
                    <label className="block text-[11px] uppercase tracking-wider text-vastu-muted mb-1">{field.label}</label>
                  )}
                  {field.type === 'textarea' || field.type === 'list' ? (
                    <textarea
                      rows={5}
                      value={String(fieldValue(editing, field))}
                      onChange={(e) => setEditing(applyField(editing, field, e.target.value))}
                      className="w-full border border-vastu-border rounded px-3 py-2 text-xs"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={String(editing[field.key] || '')}
                      onChange={(e) => setEditing(applyField(editing, field, e.target.value))}
                      className="w-full border border-vastu-border rounded px-3 py-2 text-xs"
                    >
                      {(field.options || []).map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'color' ? (
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-vastu-muted mb-1">{field.label}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={String(fieldValue(editing, field) || '#C5A059').startsWith('#') && String(fieldValue(editing, field) || '#C5A059').length === 7 ? String(fieldValue(editing, field)) : '#C5A059'}
                          onChange={(e) => setEditing(applyField(editing, field, e.target.value))}
                          className="w-9 h-8 p-0.5 border border-vastu-border rounded cursor-pointer bg-white"
                        />
                        <input
                          type="text"
                          placeholder="#RRGGBB"
                          value={String(fieldValue(editing, field) ?? '')}
                          onChange={(e) => setEditing(applyField(editing, field, e.target.value))}
                          className="flex-1 border border-vastu-border rounded px-3 py-2 text-xs font-mono"
                        />
                        <div
                          className="w-8 h-8 rounded border border-vastu-border shadow-inner flex-shrink-0"
                          style={{ backgroundColor: String(fieldValue(editing, field) || 'transparent') }}
                          title="Color Swatch Preview"
                        />
                      </div>
                    </div>
                  ) : field.type !== 'image' && field.type !== 'boolean' ? (
                    <input
                      type={field.type === 'number' ? 'number' : 'text'}
                      value={String(fieldValue(editing, field) ?? '')}
                      onChange={(e) => setEditing(applyField(editing, field, e.target.value))}
                      className="w-full border border-vastu-border rounded px-3 py-2 text-xs"
                    />
                  ) : null}
                </div>
              ))}
            </div>
            {error && <p className="px-5 pb-2 text-xs text-rose-700">{error}</p>}
            <div className="px-5 py-4 border-t border-vastu-border flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-xs uppercase">Cancel</button>
              <button
                onClick={() => void save()}
                disabled={saving}
                className="inline-flex items-center gap-1.5 bg-vastu-gold text-vastu-forestDark px-5 py-2 rounded-sm text-xs font-bold uppercase"
              >
                <Save className="w-3.5 h-3.5" />
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
