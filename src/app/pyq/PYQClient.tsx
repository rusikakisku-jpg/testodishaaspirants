'use client';

import React, { useState, useEffect } from 'react';
import { fetchPyqsApi } from '@/lib/api';
import { 
  Download, 
  Search, 
  CheckCircle2, 
  Calendar, 
  PlayCircle, 
  RotateCcw, 
  BookOpen 
} from 'lucide-react';
import Link from 'next/link';

export interface PyqRecord {
  id: number | string;
  board: string;
  years?: string;
  title: string;
  description?: string;
  accent?: string;
  pdf_url?: string;
  exam_year?: number | string;
}

export default function PYQClient({ initialPyqs }: { initialPyqs: PyqRecord[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [pyqs, setPyqs] = useState<PyqRecord[]>(initialPyqs);

  useEffect(() => {
    async function refreshData() {
      try {
        const data = await fetchPyqsApi();
        if (data.length > 0) setPyqs(data);
      } catch {
        // Fallback to initial
      }
    }
    refreshData();
  }, []);

  // Board badge styling helper
  const getBoardBadgeStyle = (board: string) => {
    switch ((board || '').toUpperCase()) {
      case 'OPSC':
        return { bg: 'rgba(124, 58, 237, 0.08)', color: '#7c3aed', border: '1px solid rgba(124, 58, 237, 0.2)' };
      case 'OSSC':
        return { bg: 'rgba(11, 76, 163, 0.08)', color: '#0b4ca3', border: '1px solid rgba(11, 76, 163, 0.2)' };
      case 'OSSSC':
        return { bg: 'rgba(5, 150, 105, 0.08)', color: '#059669', border: '1px solid rgba(5, 150, 105, 0.2)' };
      case 'RRB':
        return { bg: 'rgba(217, 119, 6, 0.08)', color: '#d97706', border: '1px solid rgba(217, 119, 6, 0.2)' };
      default:
        return { bg: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' };
    }
  };

  const filteredPYQ = pyqs.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.board && item.board.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="container">
      {/* Section Header & Search Row matching odishaaspirants.com/latest-jobs */}
      <div className="header-search-row">
        <div className="page-header">
          <h1>Previous Year Question Papers</h1>
          <p>Download previous year question papers and practice CBT tests.</p>
        </div>

        <div className="search-wrapper">
          <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94a3b8', pointerEvents: 'none', zIndex: 10 }} />
          <input
            type="text"
            className="search-input"
            id="searchBar"
            placeholder="Search past papers, boards, or titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search entries"
          />
        </div>
      </div>

      {/* Results Header Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 4px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#475569' }}>
          Showing <span style={{ color: '#0b4ca3', fontWeight: 800 }}>{filteredPYQ.length}</span> question paper archives
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0b4ca3',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <RotateCcw style={{ width: '13px', height: '13px' }} /> Clear Search
          </button>
        )}
      </div>

      {/* Grid of PYQ Cards */}
      {filteredPYQ.length > 0 ? (
        <div className="responsive-cards-grid">
          {filteredPYQ.map((item) => {
            const badgeStyle = getBoardBadgeStyle(item.board);
            const yearsArray = item.years 
              ? item.years.split(',').map((y: string) => y.trim()).filter(Boolean)
              : [String(item.exam_year || 2024)];

            const sortedYears = [...yearsArray].sort((a, b) => Number(b) - Number(a));

            return (
              <div key={item.id} className="pyq-paper-card">
                <div>
                  {/* Card Top: Board Badge & Verified Indicator */}
                  <div className="pyq-card-top">
                    <span 
                      className="pyq-board-badge" 
                      style={{ background: badgeStyle.bg, color: badgeStyle.color, border: badgeStyle.border }}
                    >
                      {item.board}
                    </span>
                    <div className="pyq-official-badge">
                      <CheckCircle2 style={{ width: '14px', height: '14px', color: '#059669' }} />
                      <span>Official PDF</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="pyq-card-title">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="pyq-card-desc">
                    {item.description}
                  </p>
                </div>

                {/* Option 1: Year-Wise Direct Session Papers & CBT Practice List */}
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Available Exam Papers &amp; CBT Sets:
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0b4ca3', background: 'rgba(11, 76, 163, 0.08)', padding: '2px 8px', borderRadius: '99px' }}>
                      {sortedYears.length} Sessions
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sortedYears.map((year: string, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '9px 12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '10px',
                          flexWrap: 'wrap',
                        }}
                      >
                        {/* Year & Session Name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              background: '#0b4ca3',
                              color: '#ffffff',
                              fontSize: '0.74rem',
                              fontWeight: 800,
                              padding: '2px 7px',
                              borderRadius: '5px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Calendar size={11} /> {year}
                          </span>
                          <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#1e293b' }}>
                            {item.board} {year} Question Paper
                          </span>
                        </div>

                        {/* Separate Action Buttons for this specific year */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <a
                            href={item.pdf_url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Download ${item.board} ${year} Official Question Paper PDF`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: '#ffffff',
                              color: '#0f172a',
                              border: '1px solid #cbd5e1',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            <Download size={12} style={{ color: '#0b4ca3' }} />
                            <span>Download PDF</span>
                          </a>

                          <Link
                            href={`/test-player?exam=${encodeURIComponent(item.board.toLowerCase())}&year=${year}`}
                            title={`Practice ${item.board} ${year} Online CBT Mock Test`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: '#0b4ca3',
                              color: '#ffffff',
                              border: 'none',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            <PlayCircle size={12} />
                            <span>Practice CBT</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '40px 20px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#94a3b8' }}>
            <Search style={{ width: '28px', height: '28px' }} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'Poppins' }}>
            No Question Papers Found
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
            No past papers match your current search &quot;{searchTerm}&quot;. Try searching with another exam name or keyword.
          </p>
          <button
            onClick={() => setSearchTerm('')}
            style={{
              background: '#0b4ca3',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <RotateCcw style={{ width: '15px', height: '15px' }} /> Clear Search
          </button>
        </div>
      )}

      {/* Preparation Guide Box */}
      <div className="pyq-prep-tips-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0b4ca3', fontWeight: 800, fontSize: '0.88rem', marginBottom: '8px' }}>
          <BookOpen style={{ width: '18px', height: '18px' }} />
          <span>TOPPER&apos;S PREPARATION STRATEGY</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'Poppins' }}>
          How to Effectively Practice with Odisha PYQs
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 16px 0', lineHeight: '1.6' }}>
          Follow this 3-step proven framework used by candidates who cracked OSSSC and OPSC civil recruitment exams:
        </p>

        <div className="pyq-prep-grid">
          <div className="pyq-prep-item">
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0b4ca3', marginBottom: '4px' }}>STEP 1: PATTERN MAPPING</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Identify High-Weightage Chapters</div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Scan the last 5 years of questions to note recurring topics in Odia Grammar, Arithmetic, and Odisha History.
            </p>
          </div>

          <div className="pyq-prep-item">
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', marginBottom: '4px' }}>STEP 2: TIMED SIMULATION</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Practice with Real CBT Player</div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Use our built-in CBT mock player with countdown timer to master time management and eliminate exam-hall panic.
            </p>
          </div>

          <div className="pyq-prep-item">
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#d97706', marginBottom: '4px' }}>STEP 3: ERROR AUDITING</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Analyze Negative Marking</div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Review the official answer key to understand why options were wrong. Avoid blind guessing on negative marking questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
