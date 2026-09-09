import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  metadataBase: new URL('https://odishaaspirants.com'),
  title: {
    default: 'Odisha Aspirants - Odisha Government Recruitment, Syllabus, Admit Card & CBT Mock Test Portal',
    template: '%s | Odisha Aspirants',
  },
  description:
    'Explore latest Odisha government job vacancies (OSSSC, OPSC, OSSC, Police, Railway), download admit cards, answer keys, results, previous year question papers, and practice real-time online CBT mock tests.',
  keywords: [
    'Odisha Aspirants',
    'Odisha Govt Jobs 2026',
    'OSSSC Recruitment 2026',
    'OPSC Notification 2026',
    'OSSC CGL Exam',
    'Odisha Police Recruitment',
    'Odisha CBT Mock Test',
    'Odisha Admit Card 2026',
    'Odisha Exam Results',
    'Odisha Question Papers PYQ',
    'Odisha Syllabus',
  ],
  authors: [{ name: 'Odisha Aspirants Team', url: 'https://odishaaspirants.com' }],
  creator: 'Odisha Aspirants',
  publisher: 'Odisha Aspirants',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://odishaaspirants.com',
    siteName: 'Odisha Aspirants',
    title: 'Odisha Aspirants - Government Recruitment & CBT Mock Test Portal',
    description:
      'Explore latest Odisha government job vacancies (OSSSC, OPSC, OSSC, Railway), download admit cards, answer keys, results, and practice online CBT tests.',
    images: [
      {
        url: 'https://upload.odishaaspirants.com/oalogo.png',
        width: 1254,
        height: 1254,
        alt: 'Odisha Aspirants Logo',
      },
      {
        url: '/oalogo.png',
        width: 1254,
        height: 1254,
        alt: 'Odisha Aspirants Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Odisha Aspirants - Government Recruitment & CBT Mock Test Portal',
    description:
      'Explore latest Odisha government job vacancies, download admit cards, answer keys, results, and practice online CBT tests.',
    images: ['https://upload.odishaaspirants.com/oalogo.png'],
  },
  icons: {
    icon: [
      { url: 'https://upload.odishaaspirants.com/oalogo.png', type: 'image/png' },
      { url: '/oalogo.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: 'https://upload.odishaaspirants.com/oalogo.png', type: 'image/png' },
      { url: '/oalogo.png', type: 'image/png' },
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
        <link rel="icon" href="https://upload.odishaaspirants.com/oalogo.png" type="image/png" />
        <link rel="icon" href="/oalogo.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://upload.odishaaspirants.com/oalogo.png" />
        <link rel="apple-touch-icon" href="/oalogo.png" />
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
