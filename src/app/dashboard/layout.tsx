import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Candidate Dashboard - Odisha Aspirants',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
