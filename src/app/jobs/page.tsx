'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JobItem } from '@/lib/data';
import { fetchJobsApi } from '@/lib/api';
import { Search, Briefcase, ChevronRight, Filter } from 'lucide-react';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchJobsApi();
      setJobs(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) || j.board.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBoard = selectedBoard === 'all' || j.board === selectedBoard;
    const matchesCategory = selectedCategory === 'all' || j.category === selectedCategory;
    return matchesSearch && matchesBoard && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '25px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2rem)' }}>
        <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins' }}>
          Government Job Vacancies in Odisha 2026
        </h1>
        <p style={{ color: '#64748b', margin: '0 0 20px 0', fontSize: '0.95rem' }}>
          Browse all active recruitment notifications, admit cards, answer keys, and exam results from OSSSC, OPSC, OSSC, and RRB.
        </p>

        {/* Filters */}
        <div className="jobs-filters-grid">
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search job title or board..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <select
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              outline: 'none',
              background: 'white',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <option value="all">All Boards</option>
            <option value="OSSSC">OSSSC</option>
            <option value="OPSC">OPSC</option>
            <option value="OSSC">OSSC</option>
            <option value="WCD Odisha">WCD Odisha</option>
            <option value="Odisha Police">Odisha Police</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              outline: 'none',
              background: 'white',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <option value="all">All Categories</option>
            <option value="vacancy">Vacancies</option>
            <option value="admit">Admit Cards</option>
            <option value="key">Answer Keys</option>
            <option value="result">Results</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="responsive-cards-grid">
        {loading ? (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#64748b' }}>
            Loading recruitment posts from Cloudflare D1...
          </div>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ background: 'rgba(11, 76, 163, 0.1)', color: '#0b4ca3', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {job.board}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{job.publishDate}</span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0', fontFamily: 'Poppins', lineHeight: 1.4 }}>
                  {job.title}
                </h3>

                <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div><strong>Vacancies:</strong> {job.vacancies}</div>
                  <div><strong>Qualification:</strong> {job.qualification}</div>
                  <div><strong>Last Date:</strong> <span style={{ color: '#ef4444', fontWeight: 700 }}>{job.lastDate}</span></div>
                </div>
              </div>

              <Link
                href={`/jobs/${job.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#0b4ca3',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap',
                }}
              >
                View Details <ChevronRight style={{ width: '16px', height: '16px' }} />
              </Link>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No recruitment notifications found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
