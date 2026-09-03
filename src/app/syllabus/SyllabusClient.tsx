'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  FileText,
  Calendar,
  X
} from 'lucide-react';
import { fetchSyllabusApi, fetchJobsApi } from '@/lib/api';

export interface SyllabusDisplayItem {
  id: string | number;
  title: string;
  board: string;
  year: string;
  pattern?: string;
  description?: string;
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
          pattern: p.pattern,
          description: p.description,
          link: `/jobs/${p.id}`,
        }));

        jobs.forEach((j) => {
          if (!formatted.some((f) => String(f.id) === String(j.id))) {
            formatted.push({
              id: j.id,
              title: `${j.title} Syllabus`,
              board: j.board,
              year: '2026',
              pattern: 'Written Exam / CBT + Certificate Verification',
              description: `Official selection scheme and syllabus pattern for ${j.board} ${j.title} recruitment 2026.`,
              link: `/jobs/${j.id}`,
            });
          }
        });

        if (formatted.length > 0) setSyllabusList(formatted);
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

  const boardsList = ['All', 'OSSSC', 'OSSC', 'OPSC', 'RRB'];

  const filteredItems = syllabusList.filter((item) => {
    const matchesBoard = activeBoard === 'All' || item.board.toUpperCase() === activeBoard.toUpperCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.board.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesBoard && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Professional Hero Section */}
      <div className="syllabus-hero-card">
        <div className="syllabus-hero-badge">
          <Sparkles style={{ width: '15px', height: '15px', color: '#ff7a00' }} />
          <span>OFFICIAL EXAM PATTERNS &amp; SYLLABUS • 2026</span>
        </div>

        <h1 className="syllabus-hero-title">
          Odisha Exam Syllabus &amp; Selection Pattern 2026
        </h1>

        <p className="syllabus-hero-desc">
          Download updated exam patterns, mark distribution schemes, section-wise topics, stages of examination, and CBT negative marking rules for OSSSC, OSSC, OPSC, and Railway recruitments.
        </p>

        {/* Feature Highlights Strip */}
        <div className="syllabus-features-strip">
          <div className="syllabus-feature-chip">
            <Layers style={{ width: '15px', height: '15px', color: '#7c3aed' }} />
            <span>Complete Stage-Wise Marks Breakdown</span>
          </div>
          <div className="syllabus-feature-chip">
            <CheckCircle2 style={{ width: '15px', height: '15px', color: '#059669' }} />
            <span>Negative Marking Scheme Included</span>
          </div>
          <div className="syllabus-feature-chip">
            <FileText style={{ width: '15px', height: '15px', color: '#0b4ca3' }} />
            <span>100% Free &amp; Verified PDF Schematics</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="syllabus-filter-bar">
          {/* Board Filter Tabs */}
          <div className="syllabus-board-tabs">
            {boardsList.map((board) => {
              const isActive = activeBoard.toUpperCase() === board.toUpperCase();
              const count = board === 'All' 
                ? syllabusList.length 
                : syllabusList.filter((s) => s.board.toUpperCase() === board.toUpperCase()).length;
              return (
                <button
                  key={board}
                  onClick={() => setActiveBoard(board)}
                  className={`syllabus-board-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <span>{board === 'All' ? 'All Boards' : board}</span>
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
              placeholder="Search syllabus by exam or post (e.g. CGL, RI, OCS, Forest Guard)..."
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
          Showing <span style={{ color: '#0b4ca3', fontWeight: 800 }}>{filteredItems.length}</span> exam syllabus patterns
        </div>
        {(searchTerm || activeBoard !== 'All') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveBoard('All');
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

      {/* Grid of Syllabus Cards */}
      {filteredItems.length > 0 ? (
        <div className="responsive-cards-grid">
          {filteredItems.map((item) => {
            const badgeStyle = getBoardBadgeStyle(item.board);

            return (
              <div key={item.id} className="syllabus-card">
                <div>
                  {/* Card Top: Board Badge & Year */}
                  <div className="syllabus-card-top">
                    <span 
                      className="syllabus-board-badge" 
                      style={{ background: badgeStyle.bg, color: badgeStyle.color, border: badgeStyle.border }}
                    >
                      {item.board}
                    </span>
                    <div className="syllabus-year-badge">
                      <Calendar style={{ width: '12px', height: '12px', color: '#0b4ca3' }} />
                      <span>Updated {item.year}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="syllabus-card-title">
                    {item.title}
                  </h3>

                  {/* Exam Pattern Highlight Box */}
                  {item.pattern && (
                    <div className="syllabus-pattern-box">
                      <Layers style={{ width: '15px', height: '15px', color: '#0b4ca3', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b', marginBottom: '2px' }}>
                          Selection Scheme
                        </strong>
                        <span>{item.pattern}</span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="syllabus-card-desc">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Card Action Button */}
                <Link
                  href={item.link}
                  className="syllabus-btn-view"
                >
                  <span>View Full Syllabus &amp; Exam Pattern</span>
                  <ArrowRight style={{ width: '15px', height: '15px' }} />
                </Link>
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
            No Exam Syllabus Found
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
            No syllabus entries match your search &quot;{searchTerm}&quot;. Try using another board name or clear your filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveBoard('All');
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

      {/* Exam Pattern & Syllabus Guidance Box */}
      <div className="syllabus-guide-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0b4ca3', fontWeight: 800, fontSize: '0.88rem', marginBottom: '8px' }}>
          <BookOpen style={{ width: '18px', height: '18px' }} />
          <span>CANDIDATE SELECTION GUIDE</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'Poppins' }}>
          Understanding Odisha Recruitment Exam Stages
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 16px 0', lineHeight: '1.6' }}>
          Most examinations conducted by OSSSC, OSSC, and OPSC follow a 3-tier recruitment process:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px', marginTop: '18px' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0b4ca3', marginBottom: '4px' }}>STAGE 1: PRELIMS CBT</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Objective MCQ Screening</div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Focus on General Studies, Odia, English, and Arithmetic. Standard negative marking is 0.25 to 0.33 marks per wrong answer.
            </p>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#7c3aed', marginBottom: '4px' }}>STAGE 2: MAINS WRITTEN</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>In-Depth Technical / GS</div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Subject-specific papers requiring thorough conceptual knowledge. Marks obtained in Mains form the basis of the merit list.
            </p>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', marginBottom: '4px' }}>STAGE 3: SKILL &amp; VIVA</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Computer Skill / Verification</div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Basic MS Office practicals, typing speed test, and original document scrutiny before final recommendation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
