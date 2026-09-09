'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchJobDetailsApi, fetchJobsApi, getJobSlug } from '@/lib/api';
import { JobItem } from '@/lib/data';
import ArticleDetailsClient from './articles/[slug]/ArticleDetailsClient';
import { AlertCircle, Home, Briefcase } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const [checkingRoute, setCheckingRoute] = useState(true);
  const [resolvedSlug, setResolvedSlug] = useState<string | null>(null);
  const [resolvedJob, setResolvedJob] = useState<JobItem | null>(null);
  const [allJobs, setAllJobs] = useState<JobItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;

    // 1. Handle /jobs redirect
    if (path === '/jobs' || path === '/jobs/') {
      router.replace('/latest-jobs');
      return;
    }

    // 2. Handle /jobs/[id] redirect
    if (path.startsWith('/jobs/')) {
      const id = path.replace(/^\/jobs\//, '').replace(/\/$/, '');
      if (id) {
        fetchJobDetailsApi(id)
          .then((job) => {
            if (job) {
              router.replace(`/articles/${getJobSlug(job)}`);
            } else {
              router.replace('/latest-jobs');
            }
          })
          .catch(() => {
            router.replace('/latest-jobs');
          });
        return;
      }
    }

    // 3. Handle dynamic /articles/[slug] fallback
    if (path.startsWith('/articles/')) {
      const slug = path.replace(/^\/articles\//, '').replace(/\/$/, '');
      if (slug) {
        Promise.all([fetchJobDetailsApi(slug), fetchJobsApi()])
          .then(([singleJob, list]) => {
            if (singleJob) {
              setResolvedSlug(slug);
              setResolvedJob(singleJob);
              setAllJobs(list);
              setCheckingRoute(false);
            } else {
              setCheckingRoute(false);
            }
          })
          .catch(() => {
            setCheckingRoute(false);
          });
        return;
      }
    }

    setCheckingRoute(false);
  }, [router]);

  // If checking or resolving a dynamic article
  if (checkingRoute) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', fontFamily: 'Poppins, sans-serif' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e2e8f0',
            borderTop: '3px solid #0b4ca3',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px auto',
          }}
        />
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Loading notification details from database...</p>
      </div>
    );
  }

  // If dynamic article matched and loaded directly from D1
  if (resolvedSlug && resolvedJob) {
    return (
      <ArticleDetailsClient
        slug={resolvedSlug}
        initialJob={resolvedJob}
        initialAllJobs={allJobs}
      />
    );
  }

  // True 404 page
  return (
    <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 20px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
      <div
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: '#fef2f2',
          color: '#dc2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
        }}
      >
        <AlertCircle size={36} />
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0' }}>
        404 - Page Not Found
      </h1>
      <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 30px 0' }}>
        The page or notification you are looking for does not exist or might have been moved.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#0b4ca3',
            color: 'white',
            padding: '12px 22px',
            borderRadius: '10px',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}
        >
          <Home size={16} /> Go to Homepage
        </Link>
        <Link
          href="/latest-jobs"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f1f5f9',
            color: '#334155',
            padding: '12px 22px',
            borderRadius: '10px',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.9rem',
            border: '1px solid #cbd5e1',
          }}
        >
          <Briefcase size={16} /> Browse Latest Jobs
        </Link>
      </div>
    </div>
  );
}
