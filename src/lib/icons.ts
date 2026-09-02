import type { LucideIcon } from 'lucide-react';
import {
  Award,
  Building2,
  CheckCircle,
  Compass,
  Factory,
  Globe,
  HeartHandshake,
  Home,
  Shield,
  Sparkles,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Award,
  Building2,
  CheckCircle,
  Compass,
  Factory,
  Globe,
  HeartHandshake,
  Home,
  Shield,
  Sparkles,
};

export function iconByName(name?: string): LucideIcon {
  if (!name) return Sparkles;
  return ICONS[name] || Sparkles;
}
