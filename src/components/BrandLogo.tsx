import { useCms } from '../context/CmsProvider';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  markOnly?: boolean;
  className?: string;
  imgClassName?: string;
}

export function BrandLogo({
  variant = 'light',
  markOnly = false,
  className = '',
  imgClassName = '',
}: BrandLogoProps) {
  const { settings } = useCms();
  const lightLogo = settings.logo_url || '/brand/zen-vastu-logo-transparent.png';
  const darkLogo = settings.logo_on_dark_url || '/brand/zen-vastu-logo-on-dark.png';
  const mark = settings.mark_url || '/brand/zen-vastu-mark.png';
  const src = markOnly ? mark : variant === 'dark' ? darkLogo : lightLogo;
  const alt = settings.brand_name || 'Zen Vastu';

  return (
    <span className={`inline-flex items-center ${className}`}>
      <img src={src} alt={alt} className={`object-contain ${imgClassName}`} />
    </span>
  );
}
