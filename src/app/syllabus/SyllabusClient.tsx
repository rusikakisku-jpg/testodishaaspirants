'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  BookOpen, 
  Layers, 
  ArrowRight, 
  RotateCcw,
  Calendar,
  AlertCircle,
  FileCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
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
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

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

  // Helper to parse stages from pattern string
  const parseStages = (pattern?: string) => {
    if (!pattern) return ['Written Examination', 'Document Verification'];
    return pattern
      .split('+')
      .map((s) => s.trim())
      .filter(Boolean);
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

  const toggleExpand = (id: string | number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Clean Minimalist Hero Header */}
      <div className="syllabus-clean-hero">
        <div className="syllabus-clean-header-top">
          <div className="syllabus-clean-icon-box">
            <BookOpen style={{ width: '22px', height: '22px' }} />
          </div>
          <div>
            <h1 className="syllabus-clean-title">
              Odisha Exam Syllabus &amp; Selection Pattern 2026
            </h1>
            <span style={{ fontSize: '0.8rem', color: '#0b4ca3', fontWeight: 700 }}>
              Official Curriculum &amp; Marking Schemes Archive
            </span>
          </div>
        </div>

        <p className="syllabus-clean-desc">
          Browse verified exam syllabi, multi-stage selection processes, section-wise marks distribution, and negative marking penalty rules for OSSSC, OSSC, OPSC, and Railway recruitments.
        </p>

        {/* Quick Highlights Strip */}
        <div className="syllabus-quick-chips-row">
          <div className="syllabus-quick-chip">
            <ShieldCheck style={{ width: '15px', height: '15px', color: '#059669' }} />
            <span>100% Official &amp; Verified Schemes</span>
          </div>
          <div className="syllabus-quick-chip">
            <Layers style={{ width: '15px', height: '15px', color: '#0b4ca3' }} />
            <span>Stage 1 (Prelims), Stage 2 (Mains) &amp; Skill Tests</span>
          </div>
          <div className="syllabus-quick-chip">
            <AlertCircle style={{ width: '15px', height: '15px', color: '#dc2626' }} />
            <span>Negative Marking: 0.25 to 0.33 Marks</span>
          </div>
        </div>

        {/* Search & Board Switcher Hub */}
        <div>
          {/* Board Selector Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {boardsList.map((board) => {
              const isActive = activeBoard.toUpperCase() === board.toUpperCase();
              const count = board === 'All' 
                ? syllabusList.length 
                : syllabusList.filter((s) => s.board.toUpperCase() === board.toUpperCase()).length;
              return (
                <button
                  key={board}
                  onClick={() => setActiveBoard(board)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: isActive ? '1px solid #0b4ca3' : '1px solid #e2e8f0',
                    background: isActive ? '#0b4ca3' : '#f8fafc',
                    color: isActive ? '#ffffff' : '#475569',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: isActive ? '0 2px 8px rgba(11, 76, 163, 0.2)' : 'none',
                  }}
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
              placeholder="Search syllabus by exam or post name (e.g. CGL, RI, OCS, Forest Guard)..."
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
              }}
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

      {/* Grid of Syllabus Cards with Accordion Preview */}
      {filteredItems.length > 0 ? (
        <div className="responsive-cards-grid">
          {filteredItems.map((item) => {
            const badgeStyle = getBoardBadgeStyle(item.board);
            const stages = parseStages(item.pattern);
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="syllabus-directory-card">
                <div>
                  {/* Card Top: Board Badge & Year */}
                  <div className="syllabus-card-top-bar">
                    <span 
                      className="syllabus-board-pill-tag" 
                      style={{ background: badgeStyle.bg, color: badgeStyle.color, border: badgeStyle.border }}
                    >
                      {item.board}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                      <Calendar style={{ width: '12px', height: '12px', color: '#0b4ca3' }} />
                      <span>Updated {item.year}</span>
                    </div>
                  </div>

                  {/* Exam Title */}
                  <h3 className="syllabus-exam-title">
                    {item.title}
                  </h3>

                  {/* Specs Matrix */}
                  <div className="syllabus-specs-grid">
                    <div className="syllabus-spec-item">
                      <span className="syllabus-spec-label">Selection Mode:</span>
                      <span className="syllabus-spec-value">{stages[0] || 'Written Test / CBT'}</span>
                    </div>
                    <div className="syllabus-spec-item">
                      <span className="syllabus-spec-label">Exam Stages:</span>
                      <span className="syllabus-spec-value">{stages.length} Stage Selection</span>
                    </div>
                    <div className="syllabus-spec-item">
                      <span className="syllabus-spec-label">Negative Mark:</span>
                      <span className="syllabus-spec-value" style={{ color: '#dc2626' }}>
                        {item.board.toUpperCase() === 'OPSC' ? '-0.33 (1/3rd)' : '-0.25 (1/4th)'} per wrong answer
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 14px 0', lineHeight: 1.55 }}>
                      {item.description}
                    </p>
                  )}

                  {/* Accordion Drawer (Expanded View) */}
                  {isExpanded && (
                    <div className="syllabus-accordion-drawer">
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0b4ca3', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Complete Selection Hierarchy:
                      </div>
                      {stages.map((stage, idx) => (
                        <div key={idx} className="syllabus-drawer-stage-item">
                          <span className="syllabus-drawer-stage-dot"></span>
                          <span>Stage {idx + 1}: {stage}</span>
                        </div>
                      ))}
                      <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #cbd5e1', fontSize: '0.78rem', color: '#64748b' }}>
                        Includes detailed syllabus PDF and CBT practice simulation.
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions: Toggle Accordion & Direct Link */}
                <div>
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="syllabus-btn-accordion-toggle"
                  >
                    <span>{isExpanded ? 'Hide Stage Breakdown' : 'Quick View Stages & Details'}</span>
                    {isExpanded ? (
                      <ChevronUp style={{ width: '15px', height: '15px' }} />
                    ) : (
                      <ChevronDown style={{ width: '15px', height: '15px' }} />
                    )}
                  </button>

                  <Link
                    href={item.link}
                    className="syllabus-btn-direct-link"
                  >
                    <span>Full Syllabus &amp; Notification</span>
                    <ArrowRight style={{ width: '15px', height: '15px' }} />
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

      {/* Candidate Guidance Strategy Card */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2rem)', marginTop: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0b4ca3', fontWeight: 800, fontSize: '0.88rem', marginBottom: '8px' }}>
          <BookOpen style={{ width: '18px', height: '18px' }} />
          <span>OFFICIAL ODISHA EXAM SELECTION RULES</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'Poppins' }}>
          Odisha Recruitment Examination Scheme &amp; Penalty Rules
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 16px 0', lineHeight: '1.6' }}>
          Key highlights regarding CBT negative marking and qualifying cutoff scores:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px', marginTop: '16px' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', marginBottom: '4px' }}>OSSSC EXAMS (RI / ARI / AMIN)</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>1/4th Penalty (-0.25)</div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Objective screening followed by practical computer skill test (minimum 40% qualifying marks required).
            </p>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0b4ca3', marginBottom: '4px' }}>OSSC CGL &amp; CTSRE</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Prelims MCQ + Main Written</div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Negative marking of 0.25 marks in Prelims. Mains written exam score determines merit list ranking.
            </p>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#7c3aed', marginBottom: '4px' }}>OPSC CIVIL SERVICES (OCS)</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>1/3rd Penalty (-0.33) in Prelims</div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Paper-II CSAT requires 33% qualifying marks. Mains written exam comprises 9 papers followed by Interview.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
