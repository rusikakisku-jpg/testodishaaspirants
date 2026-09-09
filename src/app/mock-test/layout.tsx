import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online CBT Mock Test Portal 2026 - OSSSC CRE IV, OSSC CGL Practice Exam',
  description:
    'Practice free online Computer Based Tests (CBT) for Odisha government examinations including OSSSC CRE IV, OSSC CGL, and OPSC OAS with real exam interface, timer, and instant scorecard.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MockTestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
