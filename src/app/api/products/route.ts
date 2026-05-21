// ============================================
// API: Products CRUD
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import {
  getDocuments, addDocument, updateDocument, deleteDocument, db
} from '@/lib/firebase';
import { collection, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { validateProduct } from '@/lib/validation';
import { withCircuitBreaker, Circuits } from '@/lib/circuit-breaker';

// GET /api/products — List products with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rank = searchParams.get('rank');
    const region = searchParams.get('region');
    const status = searchParams.get('status') || 'available';
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = Math.min(parseInt(searchParams.get('pageSize') || '12'), 50);
    const search = searchParams.get('search');

    const constraints: any[] = [];

    if (status) constraints.push(where('status', '==', status));
    if (rank) constraints.push(where('rank', '==', rank));
    if (region) constraints.push(where('region', '==', region));
    if (featured === 'true') constraints.push(where('featured', '==', true));
    constraints.push(orderBy('createdAt', 'desc'));
    constraints.push(limit(pageSize));

    const products = await withCircuitBreaker(
      Circuits.FIREBASE,
      () => getDocuments('products', constraints),
      () => [] // Fallback: return empty array
    );

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        pageSize,
        hasMore: products.length === pageSize,
      },
    });
  } catch (error) {
    console.error('[API:Products:GET]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products — Create product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = validateProduct(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const id = await withCircuitBreaker(
      Circuits.FIREBASE,
      () => addDocument('products', {
        ...validation.sanitized,
        tags: body.tags || [],
        createdAt: new Date().toISOString(),
      })
    );

    return NextResponse.json({
      success: true,
      data: { id, ...validation.sanitized },
    }, { status: 201 });
  } catch (error) {
    console.error('[API:Products:POST]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
