import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { SiteProvider } from '@/context/SiteContext';
import { ToastProvider } from '@/components/ToastProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { default: 'ELITE MART — Premium CODM Accounts', template: '%s | ELITE MART' },
  description: "Ghana's #1 trusted marketplace for Call of Duty Mobile accounts. Official Activision CODM partner.",
  openGraph: {
    title: 'ELITE MART — Premium CODM Accounts',
    description: "Ghana's #1 trusted marketplace for CODM accounts.",
    type: 'website',
    images: [{ url: 'https://res.cloudinary.com/dco4egcvb/image/upload/f_auto,q_auto/IMG-20260502-WA0030_2_gja4cv' }],
  },
};

export const viewport: Viewport = { themeColor: '#0066FF', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#050510] text-white antialiased">
        <ErrorBoundary>
          <AuthProvider>
            <SiteProvider>
              <ToastProvider>
                <Header />
                <main className="relative z-10">{children}</main>
                <Footer />
              </ToastProvider>
            </SiteProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
