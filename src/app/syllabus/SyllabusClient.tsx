'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  BookOpen, 
  ArrowRight, 
  RotateCcw,
  Calendar 
} from 'lucide-react';
import { fetchSyllabusApi, fetchJobsApi, getJobSlug } from '@/lib/api';

export interface PatternApiItem {
  id: string | number;
  title: string;
  board: string;
  slug?: string;
  update_year?: string;
  pattern?: string;
  description?: string;
}

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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [syllabusList, setSyllabusList] = useState<SyllabusDisplayItem[]>(initialList);

  useEffect(() => {
    async function refreshData() {
      try {
        const [apiPatterns, jobs] = await Promise.all([
          fetchSyllabusApi(),
          fetchJobsApi(),
        ]);

        let patterns = apiPatterns || [];
        if (typeof window !== 'undefined') {
          try {
            const localData = localStorage.getItem('oa_admin_syllabus_list');
            if (localData) {
              const parsed = JSON.parse(localData);
              if (Array.isArray(parsed) && parsed.length > 0) {
                const published = parsed.filter((item: any) => item.is_published !== 0);
                const localIds = new Set(published.map((p: any) => String(p.id)));
                patterns = [...published, ...patterns.filter((p: any) => !localIds.has(String(p.id)))];
              }
            }
          } catch (err) {
            console.error('Error reading oa_admin_syllabus_list:', err);
          }
        }

        const formatted: SyllabusDisplayItem[] = patterns.map((p: PatternApiItem & { downloadUrl?: string }) => {
          const matchedJob = jobs.find(
            (j) => String(j.id) === String(p.id) || j.title.toLowerCase() === p.title.toLowerCase()
          );
          const slug = matchedJob
            ? getJobSlug(matchedJob)
            : getJobSlug({ id: Number(p.id) || 0, board: p.board, title: p.title, slug: p.slug });

          let linkUrl = `/articles/${slug}`;
          if (p.downloadUrl && p.downloadUrl !== '#' && p.downloadUrl.trim() !== '') {
            linkUrl = p.downloadUrl;
          }

          return {
            id: p.id,
            title: p.title,
            board: p.board,
            year: p.update_year || '2026',
            pattern: p.pattern,
            description: p.description,
            link: linkUrl,
          };
        });

        jobs.forEach((j) => {
          if (!formatted.some((f) => String(f.id) === String(j.id))) {
            formatted.push({
              id: j.id,
              title: `${j.title} Syllabus`,
              board: j.board,
              year: '2026',
              pattern: 'Written Exam / CBT + Certificate Verification',
              description: `Official selection scheme and syllabus pattern for ${j.board} ${j.title} recruitment 2026.`,
              link: `/articles/${getJobSlug(j)}`,
            });
          }
        });

        if (formatted.length > 0) setSyllabusList(formatted);
      } catch {
        // Silently handle refresh error
      }
    }
    refreshData();
  }, []);

  const filteredItems = syllabusList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.board.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="container">
      {/* Section Header & Search Row matching /latest-jobs and /pyq */}
      <div className="header-search-row">
        <div className="page-header">
          <h1>Odisha Exam Syllabus</h1>
          <p>Official exam syllabi, selection processes, and marking schemes.</p>
        </div>

        <div className="search-wrapper">
          <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94a3b8', pointerEvents: 'none', zIndex: 10 }} />
          <input
            type="text"
            className="search-input"
            id="searchBar"
            placeholder="Search syllabus, boards, or posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search entries"
          />
        </div>
      </div>

      {/* Results Header Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 4px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#475569' }}>
          Showing <span style={{ color: '#0b4ca3', fontWeight: 800 }}>{filteredItems.length}</span> exam syllabus patterns
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

      {/* Grid of Syllabus Cards with Accordion Preview */}
      {filteredItems.length > 0 ? (
        <div className="responsive-cards-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="syllabus-directory-card">
              <div>
                {/* Update Date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '10px' }}>
                  <Calendar style={{ width: '13px', height: '13px', color: '#0b4ca3' }} />
                  <span>Updated {item.year}</span>
                </div>

                {/* Title */}
                <h3 className="syllabus-exam-title">
                  {item.title}
                </h3>

                {/* Subtitle */}
                {item.description && (
                  <p style={{ fontSize: '0.86rem', color: '#64748b', margin: '0 0 18px 0', lineHeight: 1.55 }}>
                    {item.description}
                  </p>
                )}
              </div>

              {/* Full Syllabus & Notification Link */}
              <div>
                <Link
                  href={item.link}
                  onClick={() => {
                    try {
                      sessionStorage.setItem('last_section', 'syllabus');
                    } catch {}
                  }}
                  className="syllabus-btn-direct-link"
                >
                  <span>Full Syllabus &amp; Notification</span>
                  <ArrowRight style={{ width: '15px', height: '15px' }} />
                </Link>
              </div>
            </div>
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
            No Exam Syllabus Found
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
            No syllabus entries match your search &quot;{searchTerm}&quot;. Try using another exam name or keyword.
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
