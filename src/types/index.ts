// ============================================
// ELITE MART — Type Definitions
// ============================================

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  region: 'Global' | 'NA' | 'EU' | 'ASIA' | 'ME';
  level: number;
  rank: string;
  skins: number;
  legendarySkins?: number;
  epicSkins?: number;
  rareSkins?: number;
  weapons: string[];
  battlePass?: string;
  cpBalance?: number;
  status: 'available' | 'sold' | 'reserved';
  featured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
  productName: string;
  productImage: string;
  amount: number;
  status: 'pending' | 'paid' | 'delivered' | 'cancelled' | 'refunded';
  paymentMethod: 'paystack' | 'flutterwave' | 'manual';
  paymentRef?: string;
  accountDetails?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TradeRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  offerAccount: {
    level: number;
    rank: string;
    region: string;
    skins: number;
    legendarySkins?: number;
    description: string;
    images?: string[];
  };
  wantAccount: {
    level?: number;
    rank?: string;
    region?: string;
    skins?: number;
    description: string;
  };
  additionalInfo?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'declined' | 'completed';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SwapRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  myAccount: {
    level: number;
    rank: string;
    region: string;
    skins: number;
    legendarySkins?: number;
    description: string;
    images?: string[];
  };
  targetProductId?: string;
  targetProductName?: string;
  additionalInfo?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'declined' | 'completed';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CPPackage {
  id: string;
  name: string;
  cpAmount: number;
  price: number;
  originalPrice?: number;
  bonus?: number;
  description: string;
  featured: boolean;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CPOrder {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  packageId: string;
  packageName: string;
  cpAmount: number;
  amount: number;
  codmUid: string;
  codmUsername: string;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  paymentMethod: 'paystack' | 'flutterwave' | 'manual';
  paymentRef?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  active: boolean;
  gradient?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
  service: 'purchase' | 'trade' | 'swap' | 'cp';
  featured: boolean;
  active: boolean;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  accentColor: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  aboutText: string;
  partnerBadge: boolean;
  maintenanceMode: boolean;
}

export interface Transaction {
  id: string;
  orderId?: string;
  userId: string;
  type: 'purchase' | 'trade' | 'swap' | 'cp';
  amount: number;
  gateway: 'paystack' | 'flutterwave' | 'manual';
  gatewayRef: string;
  status: 'success' | 'failed' | 'pending';
  metadata?: Record<string, string>;
  createdAt: string;
}

export interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  pendingOrders: number;
  pendingTrades: number;
  pendingSwaps: number;
  recentOrders: Order[];
  monthlyRevenue: { month: string; revenue: number }[];
}
