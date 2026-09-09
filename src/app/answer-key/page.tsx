import React from 'react';
import type { Metadata } from 'next';
import { fetchJobsApi } from '@/lib/api';
import AnswerKeyClient from './AnswerKeyClient';

export const metadata: Metadata = {
  title: 'Odisha Answer Key 2026 - OSSSC, OPSC, OSSC Official Question Paper Solutions',
  description:
    'Check and download official Odisha recruitment exam answer keys, response sheets, and objection submission links for OSSSC, OPSC, OSSC 2026.',
  alternates: {
    canonical: 'https://odishaaspirants.com/answer-key',
  },
  openGraph: {
    title: 'Odisha Answer Key 2026 - Odisha Aspirants',
    description:
      'Check official answer keys and response sheets for Odisha government competitive exams.',
    url: 'https://odishaaspirants.com/answer-key',
  },
};

export default async function AnswerKeyPage() {
  const items = await fetchJobsApi();
  return <AnswerKeyClient initialItems={items} />;
}
