import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { LanguageProvider } from '@/lib/LanguageContext';

export const metadata: Metadata = {
  title: 'Climate Cardinals Indonesia | Official Chapter',
  description: 'Official chapter of Climate Cardinals in Indonesia. Gerakan pemuda nirlaba untuk keadilan iklim dan literasi lingkungan tanpa sekat bahasa.',
  icons: {
    icon: '/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#D91A2A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen text-white font-sans antialiased selection:bg-[#16276B] selection:text-white">
        <LanguageProvider>
          <Navigation />
          <main>
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
