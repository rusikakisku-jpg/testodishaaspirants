import React from 'react';
import type { Metadata } from 'next';
import { fetchJobsApi } from '@/lib/api';
import AdmitCardClient from './AdmitCardClient';

export const metadata: Metadata = {
  title: 'Odisha Admit Card 2026 - Download OSSSC, OPSC, OSSC Exam Hall Tickets',
  description:
    'Download Odisha government exam admit cards and hall tickets for OSSSC, OPSC, OSSC, Police and Teacher recruitment examinations 2026.',
  alternates: {
    canonical: 'https://odishaaspirants.com/admit-card',
  },
  openGraph: {
    title: 'Odisha Admit Card 2026 - Odisha Aspirants',
    description:
      'Direct download links for official Odisha exam admit cards and hall tickets.',
    url: 'https://odishaaspirants.com/admit-card',
  },
};

export default async function AdmitCardPage() {
  const items = await fetchJobsApi();
  return <AdmitCardClient initialItems={items} />;
}
