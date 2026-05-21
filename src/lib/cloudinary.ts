// ============================================
// ELITE MART — Cloudinary Upload Service
// ============================================

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dco4egcvb';
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'elite_mart';

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export async function uploadToCloudinary(
  file: File,
  folder: string = 'elite-mart'
): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);
  formData.append('quality', 'auto');
  formData.append('fetch_format', 'auto');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || 'Upload failed');
  }

  return response.json();
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  // Server-side deletion requires signed request via API route
  const response = await fetch('/api/cloudinary/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicId }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
}

export function getOptimizedUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  if (!url || !url.includes('cloudinary.com')) return url;

  const { width, height, quality = 'auto', format = 'auto' } = options;
  const transforms = [`q_${quality}`, `f_${format}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width && height) transforms.push('c_fill');

  return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
}

export function getThumbnail(url: string, size: number = 400): string {
  return getOptimizedUrl(url, { width: size, height: size, quality: 'auto:good' });
}
