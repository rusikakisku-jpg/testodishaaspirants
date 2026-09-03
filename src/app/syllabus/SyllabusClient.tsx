'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  Calendar,
  PlayCircle,
  AlertCircle,
  Compass,
  Cpu,
  Calculator,
  Languages,
  Landmark,
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

  // Helper to parse stages from pattern string
  const parseStages = (pattern?: string) => {
    if (!pattern) return ['Written Examination', 'Document Verification'];
    return pattern
      .split('+')
      .map((s) => s.trim())
      .filter(Boolean);
  };

  // Helper to extract key topics
  const getSubjectTags = (title: string, pattern?: string) => {
    const t = `${title} ${pattern || ''}`.toLowerCase();
    const tags: string[] = [];
    if (t.includes('odia') || t.includes('cgl') || t.includes('ri') || t.includes('ocs')) tags.push('Odia Language');
    if (t.includes('gk') || t.includes('gs') || t.includes('general') || t.includes('ocs')) tags.push('General Studies');
    if (t.includes('math') || t.includes('arithmetic') || t.includes('cgl') || t.includes('ri')) tags.push('Arithmetic');
    if (t.includes('reasoning') || t.includes('cgl')) tags.push('Reasoning Ability');
    if (t.includes('computer') || t.includes('skill') || t.includes('cgl') || t.includes('ri')) tags.push('Computer Test');
    if (tags.length === 0) tags.push('General Awareness', 'General English');
    return tags.slice(0, 4);
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
      {/* Brand New Modern Hero Banner */}
      <div className="syllabus-new-hero">
        <div className="syllabus-hero-badge-new">
          <Sparkles style={{ width: '15px', height: '15px', color: '#fef08a' }} />
          <span>2026 OFFICIAL EXAM SYLLABUS DIRECTORY</span>
        </div>

        <h1 className="syllabus-hero-title-new">
          Odisha Govt Exam Syllabus &amp; Selection Patterns
        </h1>

        <p className="syllabus-hero-desc-new">
          Access complete curriculum breakdowns, section-wise marks distribution, qualifying cut-off criteria, and official negative marking rules for OSSSC, OSSC, OPSC, and Railway recruitments.
        </p>

        {/* Live Metrics Strip */}
        <div className="syllabus-metrics-strip">
          <div className="syllabus-metric-pill">
            <Compass style={{ width: '15px', height: '15px', color: '#60a5fa' }} />
            <span>4 State Recruitment Boards</span>
          </div>
          <div className="syllabus-metric-pill">
            <Layers style={{ width: '15px', height: '15px', color: '#34d399' }} />
            <span>Multi-Stage CBT &amp; Mains Breakdowns</span>
          </div>
          <div className="syllabus-metric-pill">
            <AlertCircle style={{ width: '15px', height: '15px', color: '#f87171' }} />
            <span>Negative Marking Schemes Included</span>
          </div>
        </div>
      </div>

      {/* Core Subjects Quick Explorer Section */}
      <div className="syllabus-core-subjects-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0b4ca3', fontWeight: 800, fontSize: '0.82rem', marginBottom: '6px' }}>
          <BookOpen style={{ width: '16px', height: '16px' }} />
          <span>UNIVERSAL ODISHA SYLLABUS PILLARS</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins' }}>
          Key Subjects Across Odisha Competitive Exams
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
          High-yield syllabus areas recurring across OSSSC CGL/RI/Amin, OSSC, and OPSC recruitments:
        </p>

        <div className="syllabus-subject-capsules-grid">
          <div className="syllabus-subject-capsule">
            <div className="syllabus-subject-capsule-icon" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
              <Languages style={{ width: '20px', height: '20px' }} />
            </div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', fontFamily: 'Poppins' }}>
              Odia Grammar (ଓଡ଼ିଆ ବ୍ୟାକରଣ)
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Spelling errors (ଶୁଦ୍ଧ-ଅଶୁଦ୍ଧ), Sandhi, Samasa, Krudanta, Tadhita, and Odia to English translation.
            </p>
          </div>

          <div className="syllabus-subject-capsule">
            <div className="syllabus-subject-capsule-icon" style={{ background: 'rgba(11, 76, 163, 0.1)', color: '#0b4ca3' }}>
              <Landmark style={{ width: '20px', height: '20px' }} />
            </div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', fontFamily: 'Poppins' }}>
              Odisha GK &amp; History
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Kalinga history, Paika rebellion, Temple architecture, Odisha geography, rivers, and state welfare schemes.
            </p>
          </div>

          <div className="syllabus-subject-capsule">
            <div className="syllabus-subject-capsule-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
              <Calculator style={{ width: '20px', height: '20px' }} />
            </div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', fontFamily: 'Poppins' }}>
              Arithmetic &amp; Quantitative
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              10th standard arithmetic: Percentage, Ratio &amp; Proportion, Profit &amp; Loss, Simple &amp; Compound Interest, Mensuration.
            </p>
          </div>

          <div className="syllabus-subject-capsule">
            <div className="syllabus-subject-capsule-icon" style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
              <Cpu style={{ width: '20px', height: '20px' }} />
            </div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', fontFamily: 'Poppins' }}>
              Computer &amp; IT Skills
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              MS Word, Excel formulas, PowerPoint, Windows OS basics, Cyber security, and practical hands-on skill tests.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Filter & Search Hub */}
      <div className="syllabus-search-container">
        {/* Board Pill Switcher */}
        <div className="syllabus-board-filter-group">
          {boardsList.map((board) => {
            const isActive = activeBoard.toUpperCase() === board.toUpperCase();
            const count = board === 'All' 
              ? syllabusList.length 
              : syllabusList.filter((s) => s.board.toUpperCase() === board.toUpperCase()).length;
            return (
              <button
                key={board}
                onClick={() => setActiveBoard(board)}
                className={`syllabus-board-pill ${isActive ? 'active' : ''}`}
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

        {/* Search Input with Instant Clear */}
        <div style={{ position: 'relative', width: '100%' }}>
          <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search by exam name or post (e.g. CGL, RI, OCS, Forest Guard)..."
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
              transition: 'all 0.2s ease',
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

      {/* Grid of New Syllabus Cards */}
      {filteredItems.length > 0 ? (
        <div className="responsive-cards-grid">
          {filteredItems.map((item) => {
            const badgeStyle = getBoardBadgeStyle(item.board);
            const stages = parseStages(item.pattern);
            const subjectTags = getSubjectTags(item.title, item.pattern);

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

                  {/* Visual Multi-Stage Flow Pipeline */}
                  <div className="syllabus-stages-pipeline">
                    {stages.map((stage, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <div className="syllabus-stage-chip">
                          <span className="syllabus-stage-num">{sIdx + 1}</span>
                          <span>{stage}</span>
                        </div>
                        {sIdx < stages.length - 1 && (
                          <span className="syllabus-stage-arrow">&rarr;</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="syllabus-card-desc">
                      {item.description}
                    </p>
                  )}

                  {/* Key Topics Tag Strip */}
                  <div className="syllabus-subject-tags-row">
                    {subjectTags.map((tag, tIdx) => (
                      <span key={tIdx} className="syllabus-sub-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Dual Action Buttons */}
                <div className="syllabus-card-action-row">
                  <Link
                    href={item.link}
                    className="syllabus-card-btn-primary"
                  >
                    <span>View Detailed Pattern</span>
                    <ArrowRight style={{ width: '15px', height: '15px' }} />
                  </Link>

                  <Link
                    href="/test-player"
                    className="syllabus-card-btn-secondary"
                    title="Practice this exam syllabus on our CBT Mock Player"
                  >
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

      {/* Negative Marking Rules & Cut-off Reference Table */}
      <div className="syllabus-rules-table-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0b4ca3', fontWeight: 800, fontSize: '0.88rem', marginBottom: '8px' }}>
          <AlertCircle style={{ width: '18px', height: '18px', color: '#dc2626' }} />
          <span>OFFICIAL NEGATIVE MARKING &amp; CBT RULES</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'Poppins' }}>
          Negative Marking Scheme by Recruitment Authority
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 16px 0', lineHeight: '1.6' }}>
          Review the penalty deduction rules applied across different board screenings:
        </p>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', minWidth: '460px', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>Authority</th>
                <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>Exam Types</th>
                <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>Negative Mark Penalty</th>
                <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>Skill Test Rule</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#059669' }}>OSSSC</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>RI, ARI, Amin, ICDS, JA</td>
                <td style={{ padding: '10px 14px', color: '#dc2626', fontWeight: 700 }}>-0.25 (1/4th) per wrong answer</td>
                <td style={{ padding: '10px 14px', color: '#64748b' }}>Qualifying (40% Marks)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0b4ca3' }}>OSSC</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>CGL, CHSL, CTSRE, Auditors</td>
                <td style={{ padding: '10px 14px', color: '#dc2626', fontWeight: 700 }}>-0.25 to -0.33 per wrong answer</td>
                <td style={{ padding: '10px 14px', color: '#64748b' }}>Merit / Qualifying Stage</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#7c3aed' }}>OPSC</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>OCS (Civil Services), ASO</td>
                <td style={{ padding: '10px 14px', color: '#dc2626', fontWeight: 700 }}>-0.33 (1/3rd) in Prelims GS</td>
                <td style={{ padding: '10px 14px', color: '#64748b' }}>Mains Written + Viva Voce</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
