import React from 'react';
import type { Metadata } from 'next';
import { fetchNotesApi } from '@/lib/api';
import NotesClient from './NotesClient';

export const metadata: Metadata = {
  title: 'Odisha Exam Study Notes & PDF Materials 2026 - Odisha Aspirants',
  description:
    'Download comprehensive study notes, Odia grammar, Odisha GK, Arithmetic, and Computer awareness PDF materials for competitive examinations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotesPage() {
  const notes = await fetchNotesApi();
  return <NotesClient initialNotes={notes} />;
}
