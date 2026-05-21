import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = 'GHS'): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getWhatsAppLink(message: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '233203548373';
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getRankEmoji(rank: string): string {
  const rankEmojis: Record<string, string> = {
    'Legendary': '🏆',
    'Master': '⭐',
    'Grand Master': '🌟',
    'Elite': '💎',
    'Veteran': '🎖️',
    'Pro': '🔥',
    'Hardened': '💪',
  };
  return rankEmojis[rank] || '🎮';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'pending': 'bg-yellow-500/20 text-yellow-400',
    'paid': 'bg-primary-bright/20 text-primary-bright',
    'delivered': 'bg-green-500/20 text-green-400',
    'processing': 'bg-blue-500/20 text-blue-400',
    'cancelled': 'bg-red-500/20 text-red-400',
    'refunded': 'bg-purple-500/20 text-purple-400',
    'reviewing': 'bg-orange-500/20 text-orange-400',
    'accepted': 'bg-green-500/20 text-green-400',
    'declined': 'bg-red-500/20 text-red-400',
    'completed': 'bg-green-500/20 text-green-400',
    'available': 'bg-green-500/20 text-green-400',
    'sold': 'bg-red-500/20 text-red-400',
    'reserved': 'bg-yellow-500/20 text-yellow-400',
    'active': 'bg-green-500/20 text-green-400',
    'inactive': 'bg-gray-500/20 text-gray-400',
    'success': 'bg-green-500/20 text-green-400',
    'failed': 'bg-red-500/20 text-red-400',
  };
  return colors[status] || 'bg-gray-500/20 text-gray-400';
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
