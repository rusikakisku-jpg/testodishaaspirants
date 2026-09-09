'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { JobItem } from '@/lib/data';
import { fetchJobDetailsApi, getJobSlug } from '@/lib/api';

interface JobDetailsClientProps {
  id: string;
  initialJob: JobItem | null;
  initialAllJobs: JobItem[];
}

export default function JobDetailsClient({ id, initialJob }: JobDetailsClientProps) {
  const router = useRouter();

  useEffect(() => {
    if (initialJob) {
      router.replace(`/articles/${getJobSlug(initialJob)}`);
    } else {
      async function resolveAndRedirect() {
        try {
          const singleJob = await fetchJobDetailsApi(id);
          if (singleJob) {
            router.replace(`/articles/${getJobSlug(singleJob)}`);
          } else {
            router.replace('/latest-jobs');
          }
        } catch {
          router.replace('/latest-jobs');
        }
      }
      resolveAndRedirect();
    }
  }, [id, initialJob, router]);

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Poppins, sans-serif' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid #e2e8f0',
          borderTop: '3px solid #0b4ca3',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px auto',
        }}
      />
      <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Redirecting to article...</p>
    </div>
  );
}
