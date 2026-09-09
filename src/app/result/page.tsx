import React from 'react';
import type { Metadata } from 'next';
import { fetchJobsApi } from '@/lib/api';
import ResultClient from './ResultClient';

export const metadata: Metadata = {
  title: 'Odisha Exam Results 2026 - OSSSC, OPSC, OSSC Merit Lists & Cutoff Marks',
  description:
    'Check Odisha government exam results, merit lists, cutoff marks, and candidate selection notifications for OSSSC, OPSC, OSSC examinations 2026.',
  alternates: {
    canonical: 'https://odishaaspirants.com/result',
  },
  openGraph: {
    title: 'Odisha Exam Results 2026 - Odisha Aspirants',
    description:
      'Latest Odisha competitive examination results, merit lists, and cut-off scores.',
    url: 'https://odishaaspirants.com/result',
  },
};

export default async function ResultPage() {
  const items = await fetchJobsApi();
  return <ResultClient initialItems={items} />;
}
