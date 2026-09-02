import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  LogOut,
  Settings,
  Type,
  ShoppingBag,
  CalendarClock,
  RefreshCw,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCms } from '../context/CmsProvider';
import { BrandLogo } from '../components/BrandLogo';
import { seedCmsContent } from '../data/seedCms';
import { DEFAULT_SETTINGS, type SiteSettings } from '../lib/cmsTypes';
import { COLLECTIONS } from './collections';
import { CrudPage } from './CrudPage';
import { ImageField } from './ImageField';

function useAdminSession() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleError, setRoleError] = useState('');

  useEffect(() => {
    const client = supabase;
    if (!client) {
      setReady(true);
      return;
    }
    const sync = async () => {
      const { data } = await client.auth.getSession();
      const user = data.session?.user;
      setEmail(user?.email ?? null);
      if (user) {
        const { data: profile, error } = await client
          .from('profiles')
          .select('role, email')
          .eq('id', user.id)
          .maybeSingle();
        if (error) setRoleError(error.message);
        setIsAdmin(profile?.role === 'admin');
      } else {
        setIsAdmin(false);
      }
      setReady(true);
    };
    void sync();
    const { data: sub } = client.auth.onAuthStateChange(() => {
      void sync();
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { ready, email, isAdmin, roleError };
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setMessage('Supabase is not configured.');
      return;
    }
    setBusy(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-[#122218] flex items-center justify-center p-6">
      <form onSubmit={(e) => void submit(e)} className="bg-[#FAF7F2] w-full max-w-md rounded-sm border border-vastu-gold/40 p-8 space-y-4 shadow-2xl">
        <div className="space-y-3">
          <BrandLogo imgClassName="h-12 w-auto max-w-[260px]" />
          <div>
            <h1 className="font-serif text-xl text-vastu-forest">Admin Control Center</h1>
            <p className="text-xs text-vastu-muted">Authorized Personnel Only</p>
          </div>
        </div>

        <div>
          <label className="text-[11px] text-vastu-muted block mb-1 font-sans">Admin Email</label>
          <input
            type="email"
            required
            placeholder="admin@zenvastu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-vastu-border bg-white rounded px-3 py-2 text-sm text-vastu-charcoal focus:outline-none focus:border-vastu-gold"
          />
        </div>

        <div>
          <label className="text-[11px] text-vastu-muted block mb-1 font-sans">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-vastu-border bg-white rounded px-3 py-2 text-sm text-vastu-charcoal focus:outline-none focus:border-vastu-gold"
          />
        </div>

        {message && (
          <div className="p-2.5 rounded bg-rose-50 border border-rose-200">
            <p className="text-xs text-rose-700 font-sans">{message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-vastu-forest hover:bg-vastu-forestLight text-white py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shadow-vastu"
        >
          {busy ? 'Authenticating…' : 'Sign In'}
        </button>

        <div className="pt-2 text-center">
          <Link to="/" className="text-xs text-vastu-forest hover:underline">
            ← Back to website
          </Link>
        </div>
      </form>
    </div>
  );
}


function Dashboard() {
  const { refresh, products, consultations, testimonials } = useCms();
  const [stats, setStats] = useState({ orders: 0, bookings: 0, revenue: 0 });
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');

  useEffect(() => {
    if (!supabase) return;
    void (async () => {
      const [{ count: orderCount }, { data: orderRows }, { count: bookingCount }] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total'),
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
      ]);
      setStats({
        orders: orderCount || 0,
        bookings: bookingCount || 0,
        revenue: (orderRows || []).reduce((sum, row) => sum + Number(row.total || 0), 0),
      });
    })();
  }, []);

  const seed = async () => {
    if (!supabase) return;
    setSeeding(true);
    setSeedMsg('');
    try {
      await seedCmsContent(supabase);
      await refresh();
      setSeedMsg('Default website content loaded into the database.');
    } catch (err) {
      setSeedMsg(err instanceof Error ? err.message : 'Seed failed');
    }
    setSeeding(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl text-vastu-forest">Control Center</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ['Revenue', `₹${stats.revenue.toLocaleString('en-IN')}`],
          ['Orders', String(stats.orders)],
          ['Bookings', String(stats.bookings)],
          ['Live products', String(products.length)],
        ].map(([label, value]) => (
          <div key={label} className="bg-white border border-vastu-border p-4 rounded-sm">
            <div className="text-[11px] uppercase text-vastu-muted">{label}</div>
            <div className="font-serif text-2xl text-vastu-forest">{value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-vastu-border p-5 rounded-sm space-y-3">
        <h2 className="font-serif text-lg text-vastu-forest">Load current website content</h2>
        <p className="text-xs text-vastu-muted">
          Push all existing page copy, products ({products.length}), consultations ({consultations.length}) and testimonials ({testimonials.length}) into Supabase so they can be edited here.
        </p>
        <button
          onClick={() => void seed()}
          disabled={seeding}
          className="inline-flex items-center gap-2 bg-vastu-gold text-vastu-forestDark px-4 py-2 rounded-sm text-xs font-bold uppercase"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {seeding ? 'Seeding…' : 'Seed / restore defaults'}
        </button>
        {seedMsg && <p className="text-xs text-emerald-800 whitespace-pre-wrap">{seedMsg}</p>}
      </div>
    </div>
  );
}

function SettingsPage() {
  const { settings, refresh } = useCms();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState('');

  useEffect(() => setForm(settings), [settings]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.from('site_settings').upsert({ ...form, id: 1 });
    setSaved(error ? error.message : 'Settings saved');
    await refresh();
  };

  const fields: Array<keyof SiteSettings> = [
    'brand_name',
    'brand_tagline',
    'site_title',
    'theme_color',
    'whatsapp_number',
    'whatsapp_message',
    'phone',
    'phone_secondary',
    'email',
    'locations',
    'instagram_url',
    'facebook_url',
    'youtube_url',
    'free_shipping_min',
    'shipping_fee',
  ];

  return (
    <form onSubmit={(e) => void save(e)} className="space-y-6 max-w-3xl">
      <h1 className="font-serif text-2xl text-vastu-forest">Site Settings</h1>
      <p className="text-xs text-vastu-muted">
        Brand assets control the header, footer, favicon, Apple home-screen icon, and social share image.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ImageField
          label="Logo (light backgrounds)"
          value={form.logo_url}
          onChange={(url) => setForm({ ...form, logo_url: url })}
          previewClassName="object-contain bg-[#FAF7F2]"
        />
        <ImageField
          label="Logo (dark backgrounds)"
          value={form.logo_on_dark_url}
          onChange={(url) => setForm({ ...form, logo_on_dark_url: url })}
          previewClassName="object-contain bg-[#122218]"
        />
        <ImageField
          label="Brand mark / icon"
          value={form.mark_url}
          onChange={(url) => setForm({ ...form, mark_url: url })}
          previewClassName="object-contain bg-[#FAF7F2]"
        />
        <ImageField
          label="Favicon"
          value={form.favicon_url}
          onChange={(url) => setForm({ ...form, favicon_url: url })}
          previewClassName="object-contain bg-[#FAF7F2] max-w-[96px]"
        />
        <ImageField
          label="Apple touch icon"
          value={form.apple_touch_icon_url}
          onChange={(url) => setForm({ ...form, apple_touch_icon_url: url })}
          previewClassName="object-contain bg-[#FAF7F2] max-w-[96px]"
        />
        <ImageField
          label="Social / Open Graph image"
          value={form.og_image_url}
          onChange={(url) => setForm({ ...form, og_image_url: url })}
          previewClassName="object-contain bg-[#FAF7F2]"
        />
      </div>
      <label className="block text-[11px] uppercase tracking-wider text-vastu-muted">
        Site description (SEO & social)
        <textarea
          value={form.site_description}
          onChange={(e) => setForm({ ...form, site_description: e.target.value })}
          className="mt-1 w-full border border-vastu-border rounded px-3 py-2 text-xs text-vastu-charcoal normal-case min-h-[80px]"
        />
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map((key) => (
          <label key={key} className="text-[11px] uppercase tracking-wider text-vastu-muted">
            {key.replace(/_/g, ' ')}
            {key === 'whatsapp_message' || key === 'locations' ? (
              <textarea
                value={String(form[key] ?? '')}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="mt-1 w-full border border-vastu-border rounded px-3 py-2 text-xs text-vastu-charcoal normal-case"
              />
            ) : (
              <input
                type={key.includes('fee') || key.includes('min') ? 'number' : 'text'}
                value={String(form[key] ?? DEFAULT_SETTINGS[key])}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [key]: key.includes('fee') || key.includes('min') ? Number(e.target.value) : e.target.value,
                  })
                }
                className="mt-1 w-full border border-vastu-border rounded px-3 py-2 text-xs text-vastu-charcoal normal-case"
              />
            )}
          </label>
        ))}
      </div>
      <button className="bg-vastu-forest text-white px-5 py-2 rounded-sm text-xs font-bold uppercase">Save settings</button>
      {saved && <p className="text-xs text-emerald-800">{saved}</p>}
    </form>
  );
}

function CopyPage() {
  const { copyMap, refresh } = useCms();
  const [rows, setRows] = useState<{ id: string; page: string; section: string; field_key: string; label: string; value: string; field_type: string }[]>([]);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    if (!supabase) return;
    const { data } = await supabase.from('site_copy').select('*').order('sort_order');
    setRows((data || []) as typeof rows);
  };

  useEffect(() => {
    void load();
  }, []);

  const pages = useMemo(() => ['all', ...Array.from(new Set(rows.map((r) => r.page)))], [rows]);
  const visible = rows.filter((r) => filter === 'all' || r.page === filter);

  const saveRow = async (row: (typeof rows)[number]) => {
    if (!supabase) return;
    await supabase.from('site_copy').update({ value: row.value }).eq('id', row.id);
    await refresh();
  };

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-2xl text-vastu-forest">Page Copy</h1>
      <p className="text-xs text-vastu-muted">
        Edit every headline, button, image URL and paragraph. Seed defaults first if this list is empty.
      </p>
      <div className="flex gap-2 flex-wrap">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setFilter(page)}
            className={`px-3 py-1.5 text-xs rounded-sm border ${filter === page ? 'bg-vastu-forest text-white' : 'border-vastu-border'}`}
          >
            {page}
          </button>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="text-sm text-vastu-muted">No copy rows yet. Open Dashboard and click Seed / restore defaults.</p>
      )}
      <div className="space-y-3">
        {visible.map((row) => (
          <div key={row.id} className="bg-white border border-vastu-border p-4 rounded-sm">
            <div className="text-[11px] uppercase tracking-wider text-vastu-muted mb-1">
              {row.page} / {row.section} · {row.label}
            </div>
            {row.field_type === 'image' ? (
              <ImageField
                value={row.value}
                onChange={(url) => {
                  const next = { ...row, value: url };
                  setRows((prev) => prev.map((r) => (r.id === row.id ? next : r)));
                  void saveRow(next);
                }}
              />
            ) : row.field_type === 'textarea' ? (
              <textarea
                rows={3}
                value={row.value}
                onChange={(e) => setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, value: e.target.value } : r)))}
                onBlur={(e) => void saveRow({ ...row, value: e.target.value })}
                className="w-full border border-vastu-border rounded px-3 py-2 text-sm"
              />
            ) : (
              <input
                value={row.value}
                onChange={(e) => setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, value: e.target.value } : r)))}
                onBlur={(e) => void saveRow({ ...row, value: e.target.value })}
                className="w-full border border-vastu-border rounded px-3 py-2 text-sm"
              />
            )}
          </div>
        ))}
      </div>
      {Object.keys(copyMap).length > 0 && visible.length === 0 ? null : null}
    </div>
  );
}

function RecordsPage({ table, title }: { table: 'orders' | 'bookings'; title: string }) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);

  const load = async () => {
    if (!supabase) return;
    const { data } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    setRows((data || []) as Record<string, unknown>[]);
  };

  useEffect(() => {
    void load();
  }, [table]);

  const updateStatus = async (id: string, status: string) => {
    if (!supabase) return;
    await supabase.from(table).update({ status }).eq('id', id);
    await load();
  };

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-2xl text-vastu-forest">{title}</h1>
      <div className="overflow-x-auto bg-white border border-vastu-border rounded-sm">
        <table className="w-full text-xs text-left">
          <thead className="bg-vastu-cream/70">
            <tr>
              {table === 'orders' ? (
                <>
                  <th className="px-3 py-2">Ref</th>
                  <th className="px-3 py-2">Customer</th>
                  <th className="px-3 py-2">Total</th>
                  <th className="px-3 py-2">Payment</th>
                  <th className="px-3 py-2">Status</th>
                </>
              ) : (
                <>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Service</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2">When</th>
                  <th className="px-3 py-2">Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-vastu-border/40">
            {rows.map((row) => (
              <tr key={String(row.id)}>
                {table === 'orders' ? (
                  <>
                    <td className="px-3 py-2 font-mono">{String(row.order_ref)}</td>
                    <td className="px-3 py-2">{String(row.customer_name)} · {String(row.customer_phone)}</td>
                    <td className="px-3 py-2">₹{Number(row.total).toLocaleString('en-IN')}</td>
                    <td className="px-3 py-2">{String(row.payment_method)}</td>
                  </>
                ) : (
                  <>
                    <td className="px-3 py-2">{String(row.name)}</td>
                    <td className="px-3 py-2">{String(row.service_title)}</td>
                    <td className="px-3 py-2">{String(row.phone)}</td>
                    <td className="px-3 py-2">{String(row.preferred_date || '')} {String(row.preferred_time || '')}</td>
                  </>
                )}
                <td className="px-3 py-2">
                  <select
                    value={String(row.status)}
                    onChange={(e) => void updateStatus(String(row.id), e.target.value)}
                    className="border border-vastu-border rounded px-2 py-1"
                  >
                    {(table === 'orders'
                      ? ['processing', 'consecrating', 'shipped', 'delivered', 'cancelled']
                      : ['pending', 'confirmed', 'completed', 'cancelled']
                    ).map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-vastu-muted">No records yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
  { to: '/admin/copy', label: 'Page copy', icon: Type },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarClock },
  ...COLLECTIONS.map((c) => ({ to: `/admin/${c.key}`, label: c.label, icon: Compass, end: false })),
];

function Shell() {
  const navigate = useNavigate();
  const { email } = useAdminSession();

  return (
    <div className="min-h-screen bg-[#F4EEE4] flex">
      <aside className="w-60 bg-[#122218] text-white flex flex-col">
        <div className="p-5 border-b border-white/10 space-y-2">
          <BrandLogo variant="dark" imgClassName="h-8 w-auto max-w-[180px]" />
          <div className="text-[10px] text-vastu-gold uppercase tracking-[0.2em]">Admin CMS</div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 text-xs">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2 ${isActive ? 'bg-white/10 text-vastu-gold' : 'text-white/80 hover:bg-white/5'}`
              }
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="text-[10px] text-white/60 truncate">{email}</div>
          <button
            onClick={async () => {
              await supabase?.auth.signOut();
              navigate('/admin');
            }}
            className="flex items-center gap-2 text-xs text-white/80"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="copy" element={<CopyPage />} />
          <Route path="orders" element={<RecordsPage table="orders" title="Orders" />} />
          <Route path="bookings" element={<RecordsPage table="bookings" title="Consultation bookings" />} />
          {COLLECTIONS.map((config) => (
            <Route key={config.key} path={config.key} element={<CrudPage config={config} />} />
          ))}
        </Routes>
      </main>
    </div>
  );
}

export function AdminApp() {
  const { ready, isAdmin, email } = useAdminSession();

  if (!ready) {
    return <div className="min-h-screen bg-[#122218] text-white flex items-center justify-center">Loading admin…</div>;
  }
  if (!email) return <LoginScreen />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <h1 className="font-serif text-2xl text-vastu-forest">Admin access required</h1>
          <p className="text-sm text-vastu-muted">This account is signed in but is not an admin.</p>
          <button
            onClick={() => void supabase?.auth.signOut()}
            className="bg-vastu-forest text-white px-4 py-2 rounded-sm text-xs uppercase"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/*" element={<Shell />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
