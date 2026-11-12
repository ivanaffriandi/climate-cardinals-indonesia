import type { Metadata } from 'next';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
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
