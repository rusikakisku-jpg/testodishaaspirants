import React from 'react';
import { fetchJobsApi, fetchPyqsApi, fetchSyllabusApi } from '@/lib/api';
import HomePageClient from './HomePageClient';

export default async function HomePage() {
  const [allJobs, pyqData, sylData] = await Promise.all([
    fetchJobsApi(),
    fetchPyqsApi(),
    fetchSyllabusApi(),
  ]);

  const initialVacancies = allJobs.filter((j) => j.category === 'vacancy').slice(0, 10);
  const initialAdmitCards = allJobs.filter((j) => j.category === 'admit').slice(0, 10);
  const initialAnswerKeys = allJobs.filter((j) => j.category === 'key').slice(0, 10);
  const initialResults = allJobs.filter((j) => j.category === 'result').slice(0, 10);
  const initialPyqs = pyqData.slice(0, 10);
  const initialSyllabusList = sylData.slice(0, 10);

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://odishaaspirants.com/#website',
        'url': 'https://odishaaspirants.com/',
        'name': 'Odisha Aspirants',
        'description':
          'Odisha\'s dedicated portal for OSSSC, OPSC, OSSC government recruitment updates, syllabus, answer keys, admit cards, and online CBT mock tests.',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://odishaaspirants.com/latest-jobs?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
        'inLanguage': 'en',
      },
      {
        '@type': 'Organization',
        '@id': 'https://odishaaspirants.com/#organization',
        'name': 'Odisha Aspirants',
        'url': 'https://odishaaspirants.com/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://upload.odishaaspirants.com/oalogo.png',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomePageClient
        initialVacancies={initialVacancies}
        initialAdmitCards={initialAdmitCards}
        initialAnswerKeys={initialAnswerKeys}
        initialResults={initialResults}
        initialPyqs={initialPyqs}
        initialSyllabusList={initialSyllabusList}
      />
    </>
  );
}
