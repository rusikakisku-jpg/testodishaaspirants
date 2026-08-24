import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Odisha Aspirants - Government Recruitment & CBT Mock Test Portal',
  description: 'Explore latest Odisha government job vacancies (OSSSC, OPSC, OSSC, RRB), download admit cards, answer keys, results, previous year question papers, and practice online CBT tests.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ScrollToTop />
        <div className="bg-mesh-container"></div>
        <div className="glow-blob-1"></div>
        <div className="glow-blob-2"></div>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 380px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
