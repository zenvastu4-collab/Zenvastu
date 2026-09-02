import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface ImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  previewClassName?: string;
}

export function ImageField({ value, onChange, label, previewClassName = 'object-cover' }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    if (!supabase) return;
    setUploading(true);
    setError('');
    const safe = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
    const path = `${Date.now()}-${safe}`;
    const { error: uploadError } = await supabase.storage.from('media').upload(path, file, {
      upsert: true,
    });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-[11px] uppercase tracking-wider text-vastu-muted font-sans">{label}</label>}
      {value ? (
        <img src={value} alt="" className={`w-full h-32 rounded border border-vastu-border ${previewClassName}`} />
      ) : (
        <div className="w-full h-24 rounded border border-dashed border-vastu-border bg-vastu-ivoryDark flex items-center justify-center text-xs text-vastu-muted">
          No image
        </div>
      )}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://... or upload below"
        className="w-full bg-white border border-vastu-border rounded px-3 py-2 text-xs"
      />
      <label className="inline-flex items-center gap-2 text-xs font-semibold text-vastu-forest cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />
        <span className="bg-vastu-forest text-white px-3 py-1.5 rounded-sm">
          {uploading ? 'Uploading…' : 'Upload image'}
        </span>
      </label>
      {error && <p className="text-[11px] text-rose-700">{error}</p>}
    </div>
  );
}
