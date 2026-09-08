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
  MessageCircle,
  Search,
  Phone,
  ExternalLink,
  Mail,
  MapPin,
  FileText,
  Calendar,
  Clock,
  Eye,
  X,
  Filter,
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
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<Record<string, unknown> | null>(null);

  const load = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    setRows((data || []) as Record<string, unknown>[]);
    setLoading(false);
  };

  useEffect(() => {
    void load();
    setSearch('');
    setStatusFilter('all');
    setSelectedRecord(null);
  }, [table]);

  const updateStatus = async (id: string, status: string) => {
    if (!supabase) return;
    await supabase.from(table).update({ status }).eq('id', id);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord((prev: Record<string, unknown> | null) => (prev ? { ...prev, status } : null));
    }
  };

  const cleanPhone = (phone: string) => {
    const digits = (phone || '').replace(/\D/g, '');
    if (digits.length === 10) return `91${digits}`;
    return digits;
  };

  const getBookingWhatsAppUrl = (row: Record<string, unknown>) => {
    const phone = cleanPhone(String(row.phone || ''));
    const name = String(row.name || 'Client');
    const service = String(row.service_title || 'Vastu Consultation');
    const date = String(row.preferred_date || 'Upcoming slot');
    const time = String(row.preferred_time || '');
    const msg = `Namaste ${name} ji, this is Zen Vastu regarding your booking for *${service}* scheduled on *${date}${time ? ' (' + time + ')' : ''}*.\n\nWe have received your consultation request. Please share your layout / floor plan drawing here so our senior Vastu Acharya can begin the preliminary energy mapping.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const getOrderWhatsAppUrl = (row: Record<string, unknown>) => {
    const phone = cleanPhone(String(row.customer_phone || ''));
    const name = String(row.customer_name || 'Customer');
    const ref = String(row.order_ref || '');
    const status = String(row.status || 'processing');
    const msg = `Namaste ${name} ji, this is Zen Vastu regarding your sacred order *#${ref}*.\n\nYour order is currently: *${status.toUpperCase()}*. Our team is carefully handling the Vedic consecration and packing. Let us know if you have any questions!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
      case 'processing':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'confirmed':
      case 'consecrating':
        return 'bg-purple-50 text-purple-800 border-purple-300';
      case 'shipped':
        return 'bg-sky-50 text-sky-800 border-sky-300';
      case 'completed':
      case 'delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-300';
    }
  };

  const bookingStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  const orderStatuses = ['processing', 'consecrating', 'shipped', 'delivered', 'cancelled'];
  const allStatuses = table === 'orders' ? orderStatuses : bookingStatuses;

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      // Status filter
      if (statusFilter !== 'all' && String(row.status).toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      // Search query
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      if (table === 'orders') {
        return (
          String(row.order_ref || '').toLowerCase().includes(q) ||
          String(row.customer_name || '').toLowerCase().includes(q) ||
          String(row.customer_phone || '').toLowerCase().includes(q) ||
          String(row.customer_email || '').toLowerCase().includes(q) ||
          String(row.city || '').toLowerCase().includes(q)
        );
      } else {
        return (
          String(row.name || '').toLowerCase().includes(q) ||
          String(row.phone || '').toLowerCase().includes(q) ||
          String(row.email || '').toLowerCase().includes(q) ||
          String(row.service_title || '').toLowerCase().includes(q) ||
          String(row.property_type || '').toLowerCase().includes(q) ||
          String(row.city || '').toLowerCase().includes(q) ||
          String(row.notes || '').toLowerCase().includes(q)
        );
      }
    });
  }, [rows, statusFilter, search, table]);

  const countByStatus = (status: string) => {
    return rows.filter((r) => String(r.status).toLowerCase() === status.toLowerCase()).length;
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl text-vastu-forest">{title}</h1>
            <span className="bg-vastu-gold/20 text-vastu-forestDark font-mono font-semibold px-2 py-0.5 rounded-full text-xs">
              {rows.length} total
            </span>
          </div>
          <p className="text-xs text-vastu-muted mt-0.5">
            {table === 'bookings'
              ? 'Real-time client consultation requests, property audit bookings & scheduled slots'
              : 'Sacred product orders, customer shipments & ritual dispatch tracking'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => void load()}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-vastu-border hover:border-vastu-gold rounded text-xs text-vastu-charcoal transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh records"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-vastu-gold' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-vastu-border rounded p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-vastu-forest text-white shadow-xs'
                : 'bg-vastu-cream/60 text-vastu-muted hover:text-vastu-charcoal hover:bg-vastu-cream'
            }`}
          >
            All ({rows.length})
          </button>
          {allStatuses.map((st) => {
            const count = countByStatus(st);
            const active = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded text-xs capitalize whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
                  active
                    ? 'bg-vastu-forest text-white font-medium shadow-xs'
                    : 'bg-vastu-cream/40 text-vastu-muted hover:text-vastu-charcoal hover:bg-vastu-cream'
                }`}
              >
                <span>{st}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-white/20 text-white' : 'bg-stone-200/80 text-stone-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-vastu-muted" />
          <input
            type="text"
            placeholder={`Search by name, phone, ${table === 'orders' ? 'order ref' : 'city'}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-vastu-cream/30 border border-vastu-border rounded focus:outline-none focus:border-vastu-gold focus:bg-white transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-vastu-muted hover:text-vastu-charcoal text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto bg-white border border-vastu-border rounded shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#FAF7F2] text-vastu-forest border-b border-vastu-border font-serif">
            <tr>
              {table === 'orders' ? (
                <>
                  <th className="px-4 py-3 font-semibold">Order Ref & Date</th>
                  <th className="px-4 py-3 font-semibold">Customer Details</th>
                  <th className="px-4 py-3 font-semibold">Shipping Address</th>
                  <th className="px-4 py-3 font-semibold">Items & Total</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </>
              ) : (
                <>
                  <th className="px-4 py-3 font-semibold">Client & Contact</th>
                  <th className="px-4 py-3 font-semibold">Service & Property</th>
                  <th className="px-4 py-3 font-semibold">Scheduled Slot</th>
                  <th className="px-4 py-3 font-semibold">Notes / CAD</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Quick WhatsApp</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-vastu-border/40">
            {filteredRows.map((row) => (
              <tr key={String(row.id)} className="hover:bg-vastu-cream/20 transition-colors">
                {table === 'orders' ? (
                  <>
                    <td className="px-4 py-3">
                      <div className="font-mono font-bold text-vastu-forest">
                        #{String(row.order_ref || '').replace(/^#/, '')}
                      </div>
                      <div className="text-[10px] text-vastu-muted mt-0.5">
                        {row.created_at ? new Date(String(row.created_at)).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }) : ''}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-vastu-charcoal">{String(row.customer_name || 'Anonymous')}</div>
                      <div className="flex items-center gap-1.5 text-vastu-muted text-[11px] mt-0.5">
                        <Phone className="w-3 h-3 text-vastu-gold" />
                        <a href={`tel:${String(row.customer_phone || '')}`} className="hover:underline">
                          {String(row.customer_phone || '')}
                        </a>
                      </div>
                      {Boolean(row.customer_email) && (
                        <div className="text-[10px] text-vastu-muted truncate max-w-[180px]">
                          {String(row.customer_email)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-vastu-charcoal text-[11px] max-w-[200px] truncate">
                        {String(row.address || '')}
                      </div>
                      <div className="text-[10px] text-vastu-muted">
                        {String(row.city || '')}, {String(row.state || '')} {String(row.pincode || '')}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-vastu-forest text-sm">
                        ₹{Number(row.total || 0).toLocaleString('en-IN')}
                      </div>
                      <span className="inline-block text-[10px] px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 mt-0.5">
                        {String(row.payment_method || 'COD')}
                      </span>
                    </td>
                  </>
                ) : (
                  <>
                    {/* Booking: Client & Contact */}
                    <td className="px-4 py-3">
                      <div className="font-semibold text-vastu-forest text-sm">{String(row.name || 'Anonymous')}</div>
                      <div className="flex items-center gap-1.5 text-vastu-charcoal text-xs mt-0.5">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <a href={`tel:${String(row.phone || '')}`} className="hover:underline font-mono">
                          {String(row.phone || '')}
                        </a>
                      </div>
                      {Boolean(row.email) && (
                        <div className="flex items-center gap-1 text-[11px] text-vastu-muted mt-0.5">
                          <Mail className="w-2.5 h-2.5 text-vastu-muted" />
                          <a href={`mailto:${String(row.email)}`} className="hover:underline truncate max-w-[180px]">
                            {String(row.email)}
                          </a>
                        </div>
                      )}
                      <div className="text-[10px] text-vastu-muted/80 mt-1">
                        Booked: {row.created_at ? new Date(String(row.created_at)).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }) : 'Recent'}
                      </div>
                    </td>

                    {/* Booking: Service & Property */}
                    <td className="px-4 py-3">
                      <div className="inline-block px-2 py-0.5 bg-vastu-cream text-vastu-forest font-medium rounded border border-vastu-gold/20 text-xs">
                        {String(row.service_title || 'General Vastu Audit')}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-vastu-charcoal font-sans mt-1.5">
                        <MapPin className="w-3 h-3 text-amber-700 shrink-0" />
                        <span>{String(row.property_type || 'Property')}</span>
                        {Boolean(row.city) && <span className="text-vastu-muted">({String(row.city)})</span>}
                      </div>
                    </td>

                    {/* Booking: Scheduled Slot */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-vastu-charcoal font-medium text-xs">
                        <Calendar className="w-3 h-3 text-vastu-forest" />
                        <span>{String(row.preferred_date || 'Upcoming slot')}</span>
                      </div>
                      {Boolean(row.preferred_time) && (
                        <div className="flex items-center gap-1 text-[11px] text-vastu-muted mt-1">
                          <Clock className="w-3 h-3 text-vastu-gold" />
                          <span>{String(row.preferred_time)}</span>
                        </div>
                      )}
                    </td>

                    {/* Booking: Notes */}
                    <td className="px-4 py-3">
                      {Boolean(row.notes) ? (
                        <div className="max-w-[200px] text-[11px] text-vastu-charcoal line-clamp-2 bg-amber-50/70 p-1.5 rounded border border-amber-200/50">
                          {String(row.notes)}
                        </div>
                      ) : (
                        <span className="text-vastu-muted text-[11px] italic">None</span>
                      )}
                    </td>
                  </>
                )}

                {/* Status Column (Shared) */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={String(row.status || '').toLowerCase()}
                      onChange={(e) => void updateStatus(String(row.id), e.target.value)}
                      className={`border text-xs rounded-full px-2.5 py-1 font-medium cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-vastu-gold ${getStatusBadge(
                        String(row.status)
                      )}`}
                    >
                      {allStatuses.map((status) => (
                        <option key={status} value={status} className="bg-white text-vastu-charcoal capitalize">
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>

                {/* Actions Column */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* WhatsApp Action Button */}
                    <a
                      href={table === 'orders' ? getOrderWhatsAppUrl(row) : getBookingWhatsAppUrl(row)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition-colors shadow-xs"
                      title="Open WhatsApp Chat with client"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>

                    {/* View Details Modal Button */}
                    <button
                      onClick={() => setSelectedRecord(row)}
                      className="p-1.5 bg-stone-100 hover:bg-stone-200 text-vastu-forest rounded transition-colors"
                      title="View full record details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <div className="space-y-2">
                    <p className="text-vastu-muted text-sm">
                      {search ? `No ${table} matching "${search}"` : `No ${statusFilter !== 'all' ? statusFilter : ''} ${table} found.`}
                    </p>
                    {search && (
                      <button
                        onClick={() => setSearch('')}
                        className="text-xs text-vastu-forest underline cursor-pointer"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-vastu-border max-w-lg w-full shadow-2xl overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-vastu-forest text-white p-5 flex items-center justify-between border-b border-vastu-gold/30">
              <div>
                <span className="text-[10px] text-vastu-gold uppercase tracking-widest font-semibold block">
                  {table === 'bookings' ? 'Consultation Booking Details' : 'Customer Order Details'}
                </span>
                <h3 className="font-serif text-lg font-bold">
                  {table === 'bookings' ? String(selectedRecord.name || 'Client') : `#${String(selectedRecord.order_ref || '')}`}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs font-sans max-h-[75vh] overflow-y-auto">
              {table === 'bookings' ? (
                <>
                  <div className="grid grid-cols-2 gap-3 p-3 bg-vastu-cream/40 rounded border border-vastu-border">
                    <div>
                      <span className="text-vastu-muted text-[10px] uppercase block">Client Name</span>
                      <strong className="text-vastu-charcoal text-sm">{String(selectedRecord.name || '—')}</strong>
                    </div>
                    <div>
                      <span className="text-vastu-muted text-[10px] uppercase block">Status</span>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium mt-0.5 border ${getStatusBadge(String(selectedRecord.status))}`}>
                        {String(selectedRecord.status)}
                      </span>
                    </div>
                    <div>
                      <span className="text-vastu-muted text-[10px] uppercase block">Phone Number</span>
                      <a href={`tel:${String(selectedRecord.phone)}`} className="text-emerald-700 font-medium hover:underline font-mono">
                        {String(selectedRecord.phone || '—')}
                      </a>
                    </div>
                    <div>
                      <span className="text-vastu-muted text-[10px] uppercase block">Email Address</span>
                      <a href={`mailto:${String(selectedRecord.email)}`} className="text-vastu-forest hover:underline">
                        {String(selectedRecord.email || '—')}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2 p-3 bg-white rounded border border-vastu-border">
                    <span className="text-vastu-muted text-[10px] uppercase font-semibold block">Audit Specifications</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-vastu-muted block">Service:</span>
                        <strong className="text-vastu-forest">{String(selectedRecord.service_title || '—')}</strong>
                      </div>
                      <div>
                        <span className="text-vastu-muted block">Property Type:</span>
                        <strong className="text-vastu-charcoal">{String(selectedRecord.property_type || '—')}</strong>
                      </div>
                      <div>
                        <span className="text-vastu-muted block">City / Location:</span>
                        <strong className="text-vastu-charcoal">{String(selectedRecord.city || '—')}</strong>
                      </div>
                      <div>
                        <span className="text-vastu-muted block">Appointment Slot:</span>
                        <strong className="text-vastu-charcoal">
                          {String(selectedRecord.preferred_date || '—')}{' '}
                          {Boolean(selectedRecord.preferred_time) ? `(${String(selectedRecord.preferred_time)})` : ''}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {Boolean(selectedRecord.notes) && (
                    <div className="p-3 bg-amber-50/80 rounded border border-amber-200">
                      <span className="text-amber-900 text-[10px] uppercase font-semibold block mb-1">
                        Client Notes & Directions:
                      </span>
                      <p className="text-vastu-charcoal text-xs leading-relaxed">{String(selectedRecord.notes)}</p>
                    </div>
                  )}
                </>
              ) : (
                /* Order Details */
                <>
                  <div className="grid grid-cols-2 gap-3 p-3 bg-vastu-cream/40 rounded border border-vastu-border">
                    <div>
                      <span className="text-vastu-muted text-[10px] uppercase block">Order Ref</span>
                      <strong className="font-mono text-vastu-forest text-sm">#{String(selectedRecord.order_ref)}</strong>
                    </div>
                    <div>
                      <span className="text-vastu-muted text-[10px] uppercase block">Status</span>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium mt-0.5 border ${getStatusBadge(String(selectedRecord.status))}`}>
                        {String(selectedRecord.status)}
                      </span>
                    </div>
                    <div>
                      <span className="text-vastu-muted text-[10px] uppercase block">Customer Name</span>
                      <strong className="text-vastu-charcoal">{String(selectedRecord.customer_name || '—')}</strong>
                    </div>
                    <div>
                      <span className="text-vastu-muted text-[10px] uppercase block">Grand Total</span>
                      <strong className="text-vastu-forest text-sm font-bold">₹{Number(selectedRecord.total || 0).toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded border border-vastu-border space-y-1">
                    <span className="text-vastu-muted text-[10px] uppercase font-semibold block">Shipping Destination</span>
                    <div className="text-vastu-charcoal">{String(selectedRecord.address || '—')}</div>
                    <div className="text-vastu-muted">
                      {String(selectedRecord.city || '')}, {String(selectedRecord.state || '')} - {String(selectedRecord.pincode || '')}
                    </div>
                    <div className="pt-1 text-emerald-700 font-mono">
                      Phone: <a href={`tel:${String(selectedRecord.customer_phone)}`} className="hover:underline">{String(selectedRecord.customer_phone)}</a>
                    </div>
                  </div>
                </>
              )}

              {/* Status Updater inside modal */}
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded border border-vastu-border">
                <span className="text-xs font-medium text-vastu-charcoal">Update Status:</span>
                <select
                  value={String(selectedRecord.status || '').toLowerCase()}
                  onChange={(e) => void updateStatus(String(selectedRecord.id), e.target.value)}
                  className="border border-vastu-border rounded px-3 py-1 bg-white text-xs font-medium focus:outline-none focus:border-vastu-gold"
                >
                  {allStatuses.map((st) => (
                    <option key={st} value={st}>
                      {st.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="bg-stone-50 px-6 py-4 border-t border-vastu-border flex items-center justify-between gap-3">
              <a
                href={table === 'orders' ? getOrderWhatsAppUrl(selectedRecord) : getBookingWhatsAppUrl(selectedRecord)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Client on WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-vastu-charcoal rounded text-xs transition-colors font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
