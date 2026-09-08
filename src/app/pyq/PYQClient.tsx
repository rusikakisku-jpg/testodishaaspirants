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

function PYQCardItem({
  item,
  badgeStyle,
}: {
  item: PyqRecord;
  badgeStyle: { bg: string; color: string; border: string };
}) {
  const yearsArray = item.years 
    ? item.years.split(',').map((y: string) => y.trim()).filter(Boolean)
    : [String(item.exam_year || 2024)];

  const sortedYears = [...yearsArray].sort((a, b) => Number(b) - Number(a));
  const [selectedYear, setSelectedYear] = useState<string>(sortedYears[0] || '2024');

  return (
    <div className="pyq-paper-card">
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

        {/* Option 2: Interactive Year Selector Chips */}
        <div style={{ margin: '14px 0 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Select Exam Session:
            </span>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0b4ca3' }}>
              Selected: <strong>{selectedYear}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {sortedYears.map((year, idx) => {
              const isActive = selectedYear === year;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '5px 11px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: isActive ? '#0b4ca3' : '#f8fafc',
                    color: isActive ? '#ffffff' : '#334155',
                    border: isActive ? '1px solid #0b4ca3' : '1px solid #cbd5e1',
                    boxShadow: isActive ? '0 2px 6px rgba(11, 76, 163, 0.25)' : 'none',
                  }}
                  aria-pressed={isActive}
                >
                  <Calendar size={12} style={{ color: isActive ? '#ffffff' : '#0b4ca3' }} />
                  <span>{year}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Action Buttons for the Selected Year */}
      <div className="pyq-card-actions">
        <a
          href={item.pdf_url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="pyq-btn-download"
          title={`Download ${item.board} ${selectedYear} Official Paper PDF`}
        >
          <Download style={{ width: '15px', height: '15px' }} />
          <span>Download {selectedYear} PDF</span>
        </a>
        
        <Link
          href={`/test-player?exam=${encodeURIComponent(item.board.toLowerCase())}&year=${selectedYear}`}
          className="pyq-btn-cbt"
          title={`Practice ${item.board} ${selectedYear} CBT Mock Test`}
        >
          <PlayCircle style={{ width: '15px', height: '15px', color: '#0b4ca3' }} />
          <span>Practice {selectedYear} CBT</span>
        </Link>
      </div>
    </div>
  );
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
          {filteredPYQ.map((item) => (
            <PYQCardItem
              key={item.id}
              item={item}
              badgeStyle={getBoardBadgeStyle(item.board)}
            />
          ))}
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
