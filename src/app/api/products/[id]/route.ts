// ============================================
// API: Single Product CRUD
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getDocument, updateDocument, deleteDocument } from '@/lib/firebase';
import { validateProduct, isValidId } from '@/lib/validation';
import { withCircuitBreaker, Circuits } from '@/lib/circuit-breaker';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isValidId(params.id)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 });
    }

    const product = await withCircuitBreaker(
      Circuits.FIREBASE,
      () => getDocument('products', params.id),
      () => null
    );

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('[API:Product:GET]', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isValidId(params.id)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 });
    }

    const body = await request.json();
    const validation = validateProduct(body);

    if (!validation.valid) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 });
    }

    await withCircuitBreaker(
      Circuits.FIREBASE,
      () => updateDocument('products', params.id, validation.sanitized!)
    );

    return NextResponse.json({ success: true, data: validation.sanitized });
  } catch (error) {
    console.error('[API:Product:PUT]', error);
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isValidId(params.id)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 });
    }

    await withCircuitBreaker(
      Circuits.FIREBASE,
      () => deleteDocument('products', params.id)
    );

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('[API:Product:DELETE]', error);
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
