import React from 'react';
import { fetchSyllabusApi, fetchJobsApi, getJobSlug } from '@/lib/api';
import SyllabusClient, { SyllabusDisplayItem, PatternApiItem } from './SyllabusClient';

export default async function SyllabusPage() {
  const [patterns, jobs] = await Promise.all([
    fetchSyllabusApi(),
    fetchJobsApi(),
  ]);

  const initialList: SyllabusDisplayItem[] = patterns.map((p: PatternApiItem) => {
    const matchedJob = jobs.find(
      (j) => String(j.id) === String(p.id) || j.title.toLowerCase() === p.title.toLowerCase()
    );
    const slug = matchedJob
      ? getJobSlug(matchedJob)
      : getJobSlug({ id: Number(p.id) || 0, board: p.board, title: p.title, slug: p.slug });

    return {
      id: p.id,
      title: p.title,
      board: p.board,
      year: p.update_year || '2026',
      pattern: p.pattern,
      description: p.description,
      link: `/articles/${slug}?from=syllabus`,
    };
  });

  jobs.forEach((j) => {
    if (!initialList.some((f) => String(f.id) === String(j.id))) {
      initialList.push({
        id: j.id,
        title: `${j.title} Syllabus`,
        board: j.board,
        year: '2026',
        pattern: 'Written Exam / CBT + Certificate Verification',
        description: `Official selection scheme and syllabus pattern for ${j.board} ${j.title} recruitment 2026.`,
        link: `/articles/${getJobSlug(j)}?from=syllabus`,
      });
    }
  });

  return <SyllabusClient initialList={initialList} />;
}
