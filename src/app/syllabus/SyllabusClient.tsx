'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Eye } from 'lucide-react';
import { fetchSyllabusApi, fetchJobsApi } from '@/lib/api';

export interface SyllabusDisplayItem {
  id: string | number;
  title: string;
  board: string;
  year: string;
  link: string;
}

export default function SyllabusClient({ initialList }: { initialList: SyllabusDisplayItem[] }) {
  const [activeBoard, setActiveBoard] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [syllabusList, setSyllabusList] = useState<SyllabusDisplayItem[]>(initialList);

  useEffect(() => {
    async function refreshData() {
      try {
        const [patterns, jobs] = await Promise.all([
          fetchSyllabusApi(),
          fetchJobsApi(),
        ]);

        const formatted: SyllabusDisplayItem[] = patterns.map((p: any) => ({
          id: p.id,
          title: p.title,
          board: p.board,
          year: p.update_year || '2026',
          link: `/jobs/${p.id}`,
        }));

        jobs.forEach((j) => {
          if (!formatted.some((f) => String(f.id) === String(j.id))) {
            formatted.push({
              id: j.id,
              title: `${j.title} Syllabus`,
              board: j.board,
              year: '2026',
              link: `/jobs/${j.id}`,
            });
          }
        });

        if (formatted.length > 0) setSyllabusList(formatted);
      } catch (e) {}
    }
    refreshData();
  }, []);

  const filteredItems = syllabusList.filter((item) => {
    const matchesBoard = activeBoard === 'All' || item.board.toUpperCase() === activeBoard.toUpperCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.board.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBoard && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Header section */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'Poppins' }}>
          Exam Syllabus &amp; Selection Pattern
        </h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>
          Download updated exam syllabus, mark distribution, section-wise topics, and CBT negative marking rules.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: 'clamp(12px, 2.5vw, 18px)',
          marginBottom: '25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
        }}
      >
        {/* Board filter tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'OSSSC', 'OSSC', 'OPSC', 'RRB'].map((b) => (
            <button
              key={b}
              onClick={() => setActiveBoard(b)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: activeBoard === b ? 'none' : '1px solid #e2e8f0',
                background: activeBoard === b ? '#0b4ca3' : '#f8fafc',
                color: activeBoard === b ? 'white' : '#475569',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', width: '300px', maxWidth: '100%', flex: '1 1 240px' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search syllabus by exam or board..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Grid of Syllabus Cards */}
      <div className="responsive-cards-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ background: '#f1f5f9', color: '#0b4ca3', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: '6px' }}>
                  {item.board}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Updated {item.year}</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0', fontFamily: 'Poppins', lineHeight: '1.4' }}>
                {item.title}
              </h3>
            </div>

            <Link
              href={item.link}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 16px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                color: '#0b4ca3',
                fontWeight: 700,
                fontSize: '0.82rem',
                textDecoration: 'none',
                marginTop: '15px',
                transition: 'background 0.2s',
              }}
            >
              <Eye style={{ width: '15px', height: '15px' }} /> View Syllabus &amp; Pattern &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
