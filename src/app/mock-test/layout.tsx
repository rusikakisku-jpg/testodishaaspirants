import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online CBT Mock Test Portal 2026 - OSSSC CRE IV, OSSC CGL Practice Exam',
  description:
    'Practice free online Computer Based Tests (CBT) for Odisha government examinations including OSSSC CRE IV, OSSC CGL, and OPSC OAS with real exam interface, timer, and instant scorecard.',
  alternates: {
    canonical: 'https://odishaaspirants.com/mock-test',
  },
  openGraph: {
    title: 'Online CBT Mock Test Portal 2026 - Odisha Aspirants',
    description:
      'Practice real exam format CBT mock tests for Odisha competitive exams with instant scorecard.',
    url: 'https://odishaaspirants.com/mock-test',
  },
};

export default function MockTestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
