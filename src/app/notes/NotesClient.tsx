'use client';

import React, { useState, useEffect } from 'react';
import { fetchNotesApi } from '@/lib/api';
import { BookOpen, Download, Search, FileText } from 'lucide-react';

export default function NotesClient({ initialNotes }: { initialNotes: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notes, setNotes] = useState<any[]>(initialNotes);

  useEffect(() => {
    async function refreshData() {
      try {
        const data = await fetchNotesApi();
        if (data.length > 0) setNotes(data);
      } catch (e) {}
    }
    refreshData();
  }, []);

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.topics && n.topics.some((t: any) => t.title.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = selectedCategory === 'all' || n.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Hero Header */}
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2rem)', marginBottom: '25px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', background: 'rgba(5, 150, 105, 0.08)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '12px' }}>
          <BookOpen style={{ width: '16px', height: '16px' }} /> SPECIAL EXAM HANDBOOKS
        </div>
        <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins' }}>
          Subject Notes &amp; Exam Capsules 2026
        </h1>
        <p style={{ color: '#64748b', margin: '0 0 20px 0', fontSize: '0.95rem' }}>
          Free PDF study notes for Odisha History, Odia Grammar (ଓଡ଼ିଆ ବ୍ୟାକରଣ), Arithmetic, Computer Knowledge, and Current Affairs.
        </p>

        {/* Search */}
        <div className="notes-search-grid">
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search topic or handbook title..."
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            <option value="all">All Subjects</option>
            <option value="Odisha GK & History">Odisha GK &amp; History</option>
            <option value="Odia Grammar (ବ୍ୟାକରଣ)">Odia Grammar</option>
            <option value="Mathematics & Reasoning">Mathematics &amp; Reasoning</option>
            <option value="Computer Knowledge">Computer Knowledge</option>
          </select>
        </div>
      </div>

      {/* Grid of study notes */}
      <div className="responsive-cards-grid">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ background: 'rgba(5, 150, 105, 0.08)', color: '#059669', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px' }}>
                  {note.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{note.pdf_size || '3.2 MB'} PDF</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 15px 0', fontFamily: 'Poppins', lineHeight: '1.4' }}>
                {note.category} Handbook
              </h3>

              {/* Topics list */}
              <div style={{ marginBottom: '20px' }}>
                {note.topics &&
                  note.topics.map((t: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <FileText style={{ width: '15px', height: '15px', color: '#0b4ca3', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155' }}>{t.title}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{t.desc}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <a
              href={note.pdf_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '11px',
                background: '#059669',
                color: 'white',
                borderRadius: '9px',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
              }}
            >
              <Download style={{ width: '16px', height: '16px' }} /> Download Free PDF Capsule
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
