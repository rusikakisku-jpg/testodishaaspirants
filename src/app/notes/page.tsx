import React from 'react';
import type { Metadata } from 'next';
import { fetchNotesApi } from '@/lib/api';
import NotesClient from './NotesClient';

export const metadata: Metadata = {
  title: 'Odisha Exam Study Notes & PDF Materials 2026 - Odisha Aspirants',
  description:
    'Download comprehensive study notes, Odia grammar, Odisha GK, Arithmetic, and Computer awareness PDF materials for competitive examinations.',
  alternates: {
    canonical: 'https://odishaaspirants.com/notes',
  },
  openGraph: {
    title: 'Odisha Exam Study Notes & PDF Materials - Odisha Aspirants',
    description:
      'Free downloadable subject-wise study notes for Odisha competitive tests.',
    url: 'https://odishaaspirants.com/notes',
  },
};

export default async function NotesPage() {
  const notes = await fetchNotesApi();
  return <NotesClient initialNotes={notes} />;
}
