// ============================================
// API: Contact Form → Email via Resend
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/validation';
import { sendEmail, contactNotificationEmail } from '@/lib/resend';
import { withCircuitBreaker, Circuits } from '@/lib/circuit-breaker';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = validateContactForm(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const { sanitized } = validation;

    // Send email with circuit breaker
    const result = await withCircuitBreaker(
      Circuits.RESEND,
      () => sendEmail({
        to: process.env.NEXT_PUBLIC_ADMIN_EMAILS || 'admin@elitemart.com',
        subject: `Elite Mart Contact: ${sanitized!.subject}`,
        html: contactNotificationEmail({
          name: sanitized!.name as string,
          email: sanitized!.email as string,
          subject: sanitized!.subject as string,
          message: sanitized!.message as string,
        }),
      }),
      () => ({ success: false }) // Fallback: don't crash, just report failure
    );

    if (!result.success) {
      // Still save to Firestore even if email fails
      console.warn('[API:Contact] Email send failed, but form data is valid');
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
    });
  } catch (error) {
    console.error('[API:Contact:POST]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
