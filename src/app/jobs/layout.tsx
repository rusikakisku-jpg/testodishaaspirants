import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Government Jobs - Odisha Aspirants',
  robots: {
    index: false,
    follow: false,
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
