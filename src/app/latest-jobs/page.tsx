import React from 'react';
import type { Metadata } from 'next';
import { fetchJobsApi } from '@/lib/api';
import LatestJobsClient from './LatestJobsClient';

export const metadata: Metadata = {
  title: 'Latest Odisha Government Jobs 2026 - OSSSC, OPSC, OSSC Vacancies',
  description:
    'Apply online for latest Odisha government job notifications 2026. Explore OSSSC, OPSC, OSSC, Police, and Railway vacancies with eligibility, qualifications and last dates.',
  alternates: {
    canonical: 'https://odishaaspirants.com/latest-jobs',
  },
  openGraph: {
    title: 'Latest Odisha Government Jobs 2026 - Odisha Aspirants',
    description:
      'Apply online for latest Odisha government job notifications 2026. Explore OSSSC, OPSC, OSSC, Police, and Railway vacancies.',
    url: 'https://odishaaspirants.com/latest-jobs',
  },
};

export default async function LatestJobsPage() {
  const jobs = await fetchJobsApi();
  return <LatestJobsClient initialJobs={jobs} />;
}
