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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = await fetchJobDetailsApi(id);

  if (!job) {
    return {
      title: 'Job Details - Odisha Aspirants',
      description: 'Check latest Odisha government recruitment notifications, eligibility criteria, and exam dates.',
    };
  }

  const categoryLabel =
    job.category === 'admit'
      ? 'Admit Card'
      : job.category === 'key'
      ? 'Answer Key'
      : job.category === 'result'
      ? 'Result'
      : 'Recruitment';

  const title = `${job.title} 2026 - ${categoryLabel}, Eligibility & Apply Online`;
  const cleanDescription = job.overview
    ? `${job.overview.replace(/<[^>]*>/g, '').slice(0, 155)}...`
    : `Check eligibility criteria, important dates, vacancies, exam pattern, and official application process for ${job.title} (${job.board}).`;

  const canonicalUrl = `https://odishaaspirants.com/jobs/${id}`;

  return {
    title,
    description: cleanDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${job.title} | Odisha Aspirants`,
      description: cleanDescription,
      url: canonicalUrl,
      type: 'article',
      siteName: 'Odisha Aspirants',
      images: [
        {
          url: '/icon.svg',
          width: 512,
          height: 512,
          alt: job.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} | Odisha Aspirants`,
      description: cleanDescription,
      images: ['/icon.svg'],
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

  const categoryName =
    job?.category === 'admit'
      ? 'Admit Card'
      : job?.category === 'key'
      ? 'Answer Key'
      : job?.category === 'result'
      ? 'Result'
      : 'Latest Jobs';

  const categoryPath =
    job?.category === 'admit'
      ? 'admit-card'
      : job?.category === 'key'
      ? 'answer-key'
      : job?.category === 'result'
      ? 'result'
      : 'latest-jobs';

  const jobJsonLd = job
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://odishaaspirants.com',
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': categoryName,
                'item': `https://odishaaspirants.com/${categoryPath}`,
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': job.title,
                'item': `https://odishaaspirants.com/jobs/${id}`,
              },
            ],
          },
          ...(job.category === 'vacancy'
            ? [
                {
                  '@type': 'JobPosting',
                  'title': job.title,
                  'description':
                    job.overview?.replace(/<[^>]*>/g, '') ||
                    `${job.title} vacancy notification by ${job.boardFull || job.board}. Total vacancies: ${job.vacancies}.`,
                  'identifier': {
                    '@type': 'PropertyValue',
                    'name': job.boardFull || job.board,
                    'value': String(job.id),
                  },
                  'datePosted': '2026-01-01T00:00:00+05:30',
                  'validThrough': '2026-12-31T23:59:59+05:30',
                  'employmentType': 'FULL_TIME',
                  'hiringOrganization': {
                    '@type': 'Organization',
                    'name': job.boardFull || job.board,
                    'sameAs': 'https://odishaaspirants.com',
                  },
                  'jobLocation': {
                    '@type': 'Place',
                    'address': {
                      '@type': 'PostalAddress',
                      'addressRegion': 'Odisha',
                      'addressCountry': 'IN',
                    },
                  },
                  'educationRequirements': job.qualification || 'Graduate / 10th / 12th Pass',
                  'totalJobOpenings': job.vacancies || 'Various',
                },
              ]
            : [
                {
                  '@type': 'NewsArticle',
                  'headline': job.title,
                  'description':
                    job.overview?.replace(/<[^>]*>/g, '') ||
                    `${job.title} notification released by ${job.board}.`,
                  'datePublished': '2026-01-01T00:00:00+05:30',
                  'dateModified': '2026-01-01T00:00:00+05:30',
                  'author': {
                    '@type': 'Organization',
                    'name': 'Odisha Aspirants',
                  },
                  'publisher': {
                    '@type': 'Organization',
                    'name': 'Odisha Aspirants',
                    'logo': {
                      '@type': 'ImageObject',
                      'url': 'https://odishaaspirants.com/icon.svg',
                    },
                  },
                  'mainEntityOfPage': `https://odishaaspirants.com/jobs/${id}`,
                },
              ]),
        ],
      }
    : null;

  return (
    <>
      {jobJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJsonLd) }}
        />
      )}
      <JobDetailsClient id={id} initialJob={job} initialAllJobs={allJobs} />
    </>
  );
}
