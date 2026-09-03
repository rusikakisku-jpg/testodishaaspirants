'use client';

import React, { useState, useEffect } from 'react';
import { fetchPyqsApi } from '@/lib/api';
import { 
  Download, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  PlayCircle, 
  FileCheck, 
  RotateCcw,
  BookOpen,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function PYQClient({ initialPyqs }: { initialPyqs: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [pyqs, setPyqs] = useState<any[]>(initialPyqs);

  useEffect(() => {
    async function refreshData() {
      try {
        const data = await fetchPyqsApi();
        if (data.length > 0) setPyqs(data);
      } catch (e) {}
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

  const boardsList = ['all', 'OSSSC', 'OSSC', 'OPSC', 'RRB'];

  const filteredPYQ = pyqs.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.board && item.board.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBoard = selectedBoard === 'all' || item.board === selectedBoard;
    return matchesSearch && matchesBoard;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Professional Hero Section */}
      <div className="pyq-hero-card">
        <div className="pyq-hero-badge">
          <Sparkles style={{ width: '15px', height: '15px', color: '#ff7a00' }} />
          <span>OFFICIAL ODISHA EXAMS ARCHIVE • 2015 – 2026</span>
        </div>
        
        <h1 className="pyq-hero-title">
          Previous Year Question Papers (PYQ) &amp; Solutions
        </h1>
        
        <p className="pyq-hero-desc">
          Download verified shift-wise question papers and official answer keys for OSSSC RI, ARI, OPSC OCS, OSSC CGL, and Railway recruitment exams. Practice in real exam simulation mode to maximize your score.
        </p>

        {/* Feature Highlights Strip */}
        <div className="pyq-features-strip">
          <div className="pyq-feature-chip">
            <FileCheck style={{ width: '15px', height: '15px', color: '#059669' }} />
            <span>Official Answer Keys Included</span>
          </div>
          <div className="pyq-feature-chip">
            <Download style={{ width: '15px', height: '15px', color: '#0b4ca3' }} />
            <span>100% Free Direct PDF Downloads</span>
          </div>
          <div className="pyq-feature-chip">
            <PlayCircle style={{ width: '15px', height: '15px', color: '#7c3aed' }} />
            <span>Interactive CBT Player Ready</span>
          </div>
        </div>

        {/* Search & Board Filter Bar */}
        <div className="pyq-filter-bar">
          {/* Board Filter Tabs */}
          <div className="pyq-board-tabs">
            {boardsList.map((board) => {
              const isActive = selectedBoard === board;
              const count = board === 'all' 
                ? pyqs.length 
                : pyqs.filter((p) => p.board === board).length;
              return (
                <button
                  key={board}
                  onClick={() => setSelectedBoard(board)}
                  className={`pyq-board-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <span>{board === 'all' ? 'All Boards' : board}</span>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    padding: '1px 6px', 
                    borderRadius: '99px', 
                    background: isActive ? 'rgba(255, 255, 255, 0.25)' : '#e2e8f0',
                    color: isActive ? 'white' : '#64748b'
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input with Clear Button */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by exam name, post, or keyword (e.g. CGL, OCS, RI)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 42px 12px 42px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '0.92rem',
                outline: 'none',
                boxSizing: 'border-box',
                background: '#f8fafc',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onFocus={(e) => (e.target.style.background = '#ffffff')}
              onBlur={(e) => (e.target.style.background = '#f8fafc')}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Clear search"
              >
                <X style={{ width: '16px', height: '16px' }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 4px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#475569' }}>
          Showing <span style={{ color: '#0b4ca3', fontWeight: 800 }}>{filteredPYQ.length}</span> question paper archives
        </div>
        {(searchTerm || selectedBoard !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedBoard('all');
            }}
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
            <RotateCcw style={{ width: '13px', height: '13px' }} /> Reset Filters
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

                  {/* Available Years Section */}
                  <div className="pyq-years-section">
                    <span className="pyq-years-label">Available Exam Sessions:</span>
                    <div className="pyq-years-chips-row">
                      {yearsArray.map((year: string, idx: number) => (
                        <span key={idx} className="pyq-year-chip">
                          <Calendar style={{ width: '11px', height: '11px', color: '#0b4ca3' }} />
                          {year}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pyq-card-actions">
                  <a
                    href={item.pdf_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pyq-btn-download"
                  >
                    <Download style={{ width: '15px', height: '15px' }} />
                    <span>Download PDF</span>
                  </a>
                  
                  <Link href="/test-player" className="pyq-btn-cbt">
                    <PlayCircle style={{ width: '15px', height: '15px', color: '#0b4ca3' }} />
                    <span>Practice CBT</span>
                  </Link>
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
            No past papers match your current search &quot;{searchTerm}&quot;. Try using a different exam name or clear the board filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedBoard('all');
            }}
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
            <RotateCcw style={{ width: '15px', height: '15px' }} /> Reset All Filters
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
