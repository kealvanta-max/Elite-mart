// ============================================
// ELITE MART — Email Service (Resend)
// ============================================

const RESEND_API_KEY = process.env.RESEND_API_KEY;

interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from = 'ELITE MART <noreply@elitemart.com>' }: EmailPayload): Promise<{ success: boolean; id?: string }> {
  if (!RESEND_API_KEY) {
    console.warn('[Resend] No API key configured — email not sent');
    return { success: false };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: Array.isArray(to) ? to : [to], subject, html }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('[Resend] Send failed:', error);
      return { success: false };
    }

    const result = await response.json();
    return { success: true, id: result.id };
  } catch (error) {
    console.error('[Resend] Send error:', error);
    return { success: false };
  }
}

// Email templates
export function orderConfirmationEmail(data: {
  userName: string;
  productName: string;
  amount: number;
  orderId: string;
}): string {
  return `
    <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; background: #0A0E17; color: #fff; padding: 40px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 24px; background: linear-gradient(135deg, #00A1E1, #0000EE); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">ELITE MART</h1>
        <p style="color: #888; font-size: 14px;">Premium CODM Accounts</p>
      </div>
      <h2 style="font-size: 20px; margin-bottom: 16px;">Order Confirmed! 🎉</h2>
      <p style="color: #aaa; margin-bottom: 24px;">Hi ${data.userName}, your order has been received.</p>
      <div style="background: #232C3C; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
        <p style="color: #888; font-size: 13px;">Order ID</p>
        <p style="font-size: 16px; font-weight: 600;">#${data.orderId}</p>
        <p style="color: #888; font-size: 13px; margin-top: 12px;">Product</p>
        <p style="font-size: 16px;">${data.productName}</p>
        <p style="color: #888; font-size: 13px; margin-top: 12px;">Amount</p>
        <p style="font-size: 20px; font-weight: 700; color: #00A1E1;">GH₵${data.amount.toLocaleString()}</p>
      </div>
      <p style="color: #888; font-size: 13px; text-align: center;">We'll notify you once your order is processed. Thank you for choosing Elite Mart!</p>
    </div>
  `;
}

export function contactNotificationEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #0000EE;">New Contact Message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
      <p style="white-space: pre-wrap;">${data.message}</p>
    </div>
  `;
}
