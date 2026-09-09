import React from 'react';
import type { Metadata } from 'next';
import { fetchPyqsApi } from '@/lib/api';
import PYQClient from './PYQClient';

export const metadata: Metadata = {
  title: 'Odisha Previous Year Question Papers (PYQ) PDF Download - 2026',
  description:
    'Download Odisha government exam previous year question papers with answer keys in PDF format for OSSSC, OPSC, OSSC exams.',
  alternates: {
    canonical: 'https://odishaaspirants.com/pyq',
  },
  openGraph: {
    title: 'Odisha Previous Year Question Papers (PYQ) - Odisha Aspirants',
    description:
      'Free download previous year question papers for Odisha competitive examinations.',
    url: 'https://odishaaspirants.com/pyq',
  },
};

export default async function PYQPage() {
  const pyqs = await fetchPyqsApi();
  return <PYQClient initialPyqs={pyqs} />;
}
