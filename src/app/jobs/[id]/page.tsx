import React from 'react';
import type { Metadata } from 'next';
import { fetchJobsApi, fetchJobDetailsApi } from '@/lib/api';
import JobDetailsClient from './JobDetailsClient';

export async function generateStaticParams() {
  const jobs = await fetchJobsApi();
  if (jobs.length === 0) {
    return [{ id: '1' }, { id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }, { id: '58' }, { id: '99' }];
  }
  return jobs.map((job) => ({
    id: String(job.id),
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Redirecting... | Odisha Aspirants',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [job, allJobs] = await Promise.all([
    fetchJobDetailsApi(id),
    fetchJobsApi(),
  ]);

  return <JobDetailsClient id={id} initialJob={job} initialAllJobs={allJobs} />;
}
