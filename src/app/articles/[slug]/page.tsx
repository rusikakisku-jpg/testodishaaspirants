import React from 'react';
import type { Metadata } from 'next';
import { fetchJobsApi, fetchJobDetailsApi, getJobSlug } from '@/lib/api';
import ArticleDetailsClient from './ArticleDetailsClient';

export async function generateStaticParams() {
  const jobs = await fetchJobsApi();
  if (jobs.length === 0) {
    return [
      { slug: 'opsc-medical-officer-recruitment' },
      { slug: 'osssc-ri-ari-amin-recruitment' },
      { slug: 'ossc-cgl-mains-admit-card' },
    ];
  }
  const paramsList = jobs.map((job) => ({
    slug: getJobSlug(job),
  }));
  return paramsList;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const allJobs = await fetchJobsApi();
  let job = allJobs.find((j) => getJobSlug(j) === slug || String(j.id) === slug) || null;
  if (!job) {
    job = await fetchJobDetailsApi(slug);
  }

  if (!job) {
    return {
      title: 'Recruitment & Notification Details - Odisha Aspirants',
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

  const title = `${job.title} 2026 - ${categoryLabel}, Eligibility, Dates & Apply Online`;
  const cleanDescription = job.overview
    ? `${job.overview.replace(/<[^>]*>/g, '').slice(0, 155)}...`
    : `Check eligibility criteria, important dates, vacancies, exam pattern, and official application process for ${job.title} (${job.board}).`;

  const canonicalUrl = `https://odishaaspirants.com/articles/${slug}`;

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

export default async function ArticleDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allJobs = await fetchJobsApi();

  let job = allJobs.find((j) => getJobSlug(j) === slug || String(j.id) === slug) || null;
  if (!job) {
    job = await fetchJobDetailsApi(slug);
  }

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

  const articleJsonLd = job
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
                'item': `https://odishaaspirants.com/articles/${slug}`,
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
                  'mainEntityOfPage': `https://odishaaspirants.com/articles/${slug}`,
                },
              ]),
        ],
      }
    : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <ArticleDetailsClient slug={slug} initialJob={job} initialAllJobs={allJobs} />
    </>
  );
}
