'use client';

import React, { useState, useEffect } from 'react';
import { fetchPyqsApi } from '@/lib/api';
import { FileCode, Download, Search } from 'lucide-react';
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

  const filteredPYQ = pyqs.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBoard = selectedBoard === 'all' || item.board === selectedBoard;
    return matchesSearch && matchesBoard;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Hero Box */}
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2rem)', marginBottom: '25px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0b4ca3', background: 'rgba(11, 76, 163, 0.08)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '12px' }}>
          <FileCode style={{ width: '16px', height: '16px' }} /> PYQ ARCHIVE 2022 - 2026
        </div>
        <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins' }}>
          Previous Year Question Papers (PYQ)
        </h1>
        <p style={{ color: '#64748b', margin: '0 0 20px 0', fontSize: '0.95rem' }}>
          Download original question papers with official answer keys for OSSSC RI, ARI, OPSC OCS, OSSC CGL, and RRB Group D exams.
        </p>

        {/* Search & Board filter */}
        <div className="pyq-search-grid">
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by exam name or subject..."
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
              background: '#f8fafc',
              color: '#334155',
              fontWeight: 600,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <option value="all">All Boards</option>
            <option value="OSSSC">OSSSC</option>
            <option value="OSSC">OSSC</option>
            <option value="OPSC">OPSC</option>
            <option value="RRB">RRB</option>
          </select>
        </div>
      </div>

      {/* Grid of PYQ cards */}
      <div className="responsive-cards-grid">
        {filteredPYQ.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ background: 'rgba(11, 76, 163, 0.08)', color: '#0b4ca3', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>
                  {item.board}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Year {item.exam_year || 2024}</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins', lineHeight: '1.4' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                {item.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={item.pdf_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px 12px',
                  background: '#0b4ca3',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                }}
              >
                <Download style={{ width: '15px', height: '15px' }} /> Download PDF
              </a>
              <Link
                href="/test-player"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '9px 14px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                }}
              >
                Practice CBT
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
