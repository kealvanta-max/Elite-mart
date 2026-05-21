// ============================================
// ELITE MART — Input Validation & Sanitization
// ============================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  sanitized?: Record<string, unknown>;
}

// XSS Prevention — strip dangerous characters
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export function sanitizeHtml(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return input.replace(/[&<>"']/g, (m) => map[m]);
}

// Phone validation (Ghana format)
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^(\+233|0)(2[0-9]|5[0-9])\d{7}$/.test(cleaned);
}

// Email validation
export function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

// Strong password check
export function isStrongPassword(password: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  if (password.length < 8) issues.push('At least 8 characters');
  if (!/[A-Z]/.test(password)) issues.push('One uppercase letter');
  if (!/[a-z]/.test(password)) issues.push('One lowercase letter');
  if (!/[0-9]/.test(password)) issues.push('One number');
  return { valid: issues.length === 0, issues };
}

// Price validation
export function isValidPrice(price: number): boolean {
  return typeof price === 'number' && price > 0 && price <= 1000000;
}

// CODM rank validation
export const VALID_RANKS = ['Legendary', 'Master', 'Grand Master', 'Elite', 'Veteran', 'Pro', 'Hardened'] as const;
export function isValidRank(rank: string): boolean {
  return VALID_RANKS.includes(rank as typeof VALID_RANKS[number]);
}

// Region validation
export const VALID_REGIONS = ['Global', 'NA', 'EU', 'ASIA', 'ME'] as const;
export function isValidRegion(region: string): boolean {
  return VALID_REGIONS.includes(region as typeof VALID_REGIONS[number]);
}

// Level validation
export function isValidLevel(level: number): boolean {
  return Number.isInteger(level) && level >= 1 && level <= 200;
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// MongoDB-style ObjectId check (for IDs)
export function isValidId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{1,128}$/.test(id);
}

// ============================================
// Form Validators
// ============================================

export function validateProduct(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];
  const sanitized: Record<string, unknown> = {};

  // Name
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Product name is required');
  } else {
    sanitized.name = sanitizeString(data.name).slice(0, 200);
  }

  // Price
  const price = Number(data.price);
  if (!isValidPrice(price)) {
    errors.push('Valid price is required (1 - 1,000,000)');
  } else {
    sanitized.price = price;
  }

  // Original price (optional)
  if (data.originalPrice) {
    const op = Number(data.originalPrice);
    if (op > 0 && op > price) sanitized.originalPrice = op;
  }

  // Rank
  if (data.rank && typeof data.rank === 'string') {
    if (!isValidRank(data.rank)) errors.push('Invalid rank');
    else sanitized.rank = data.rank;
  }

  // Level
  const level = Number(data.level);
  if (!isValidLevel(level)) {
    errors.push('Valid level required (1-200)');
  } else {
    sanitized.level = level;
  }

  // Region
  if (data.region && typeof data.region === 'string') {
    if (!isValidRegion(data.region)) errors.push('Invalid region');
    else sanitized.region = data.region;
  }

  // Description
  if (data.description && typeof data.description === 'string') {
    sanitized.description = sanitizeString(data.description).slice(0, 5000);
  }

  // Numeric fields
  if (data.skins) sanitized.skins = Math.max(0, Math.floor(Number(data.skins)));
  if (data.legendarySkins) sanitized.legendarySkins = Math.max(0, Math.floor(Number(data.legendarySkins)));
  if (data.epicSkins) sanitized.epicSkins = Math.max(0, Math.floor(Number(data.epicSkins)));

  // Status
  const validStatuses = ['available', 'sold', 'reserved'];
  sanitized.status = validStatuses.includes(data.status as string) ? data.status : 'available';

  // Featured
  sanitized.featured = Boolean(data.featured);

  // Images array
  if (Array.isArray(data.images)) {
    sanitized.images = data.images.filter((url: string) => isValidUrl(url));
  } else {
    sanitized.images = [];
  }

  return { valid: errors.length === 0, errors, sanitized };
}

export function validateContactForm(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name is required');
  }
  if (!data.email || !isValidEmail(data.email as string)) {
    errors.push('Valid email is required');
  }
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: {
      name: sanitizeString((data.name as string) || ''),
      email: (data.email as string)?.trim().toLowerCase() || '',
      subject: sanitizeString((data.subject as string) || 'General Inquiry'),
      message: sanitizeString((data.message as string) || '').slice(0, 2000),
    },
  };
}

export function validateTradeRequest(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string') errors.push('Name is required');
  if (!data.phone || !isValidPhone(data.phone as string)) errors.push('Valid Ghana phone number required');
  if (!data.offerLevel || !isValidLevel(Number(data.offerLevel))) errors.push('Valid account level required');
  if (!data.offerRank || !isValidRank(data.offerRank as string)) errors.push('Valid rank required');

  return {
    valid: errors.length === 0,
    errors,
    sanitized: {
      name: sanitizeString((data.name as string) || ''),
      phone: sanitizeString((data.phone as string) || ''),
      email: ((data.email as string) || '').trim().toLowerCase(),
      offerLevel: Number(data.offerLevel),
      offerRank: data.offerRank,
      offerRegion: data.offerRegion || 'Global',
      offerDescription: sanitizeString((data.offerDescription as string) || '').slice(0, 2000),
      wantDescription: sanitizeString((data.wantDescription as string) || '').slice(0, 2000),
      additionalInfo: sanitizeString((data.additionalInfo as string) || '').slice(0, 1000),
    },
  };
}
