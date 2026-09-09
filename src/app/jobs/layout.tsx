import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Odisha Government Job Vacancies 2026 - OSSSC, OPSC, OSSC',
  description:
    'Browse all active government recruitment notifications and exam circulars in Odisha. Filter by board (OSSSC, OPSC, OSSC) and category.',
  alternates: {
    canonical: 'https://odishaaspirants.com/jobs',
  },
  openGraph: {
    title: 'All Odisha Government Job Vacancies 2026 - Odisha Aspirants',
    description:
      'Browse active government recruitment notifications and exam circulars in Odisha.',
    url: 'https://odishaaspirants.com/jobs',
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
