'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JobItem } from '@/lib/data';
import { fetchJobsApi, getJobSlug } from '@/lib/api';
import { Search } from 'lucide-react';

export default function AdmitCardClient({ initialItems }: { initialItems: JobItem[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<JobItem[]>(initialItems);

  useEffect(() => {
    async function refreshData() {
      try {
        const data = await fetchJobsApi();
        if (data.length > 0) setItems(data);
      } catch (e) {}
    }
    refreshData();
  }, []);

  const filteredItems = items.filter((j) => {
    const isAdmitCategory = j.category === 'admit';
    const matchesSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.board.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.boardFull.toLowerCase().includes(searchTerm.toLowerCase());
    return isAdmitCategory && matchesSearch;
  });

  return (
    <>
      <div className="container">
        {/* Section Header & Search Row matching odishaaspirants.com/admit-card */}
        <div className="header-search-row">
          <div className="page-header">
            <h1>Admit Card Notifications</h1>
            <p>Download official admit cards and call letters for Odisha recruitment exams.</p>
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

        {/* Listing Table matching odishaaspirants.com/admit-card */}
        <div className="table-card">
          <table className="jobs-table" id="jobsTable">
            <thead>
              <tr>
                <th style={{ width: '160px' }}>Release Date</th>
                <th style={{ width: '250px' }}>Board</th>
                <th>Exam / Post Name</th>
                <th>Exam Date</th>
                <th style={{ width: '160px' }}>Status</th>
                <th className="action-col" style={{ width: '140px' }}>More</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Release Date" className="publish-date-col">
                      <span className="cell-value">{item.publishDate}</span>
                    </td>
                    <td data-label="Board" className="board-col">
                      <div className="cell-value board-col">
                        <strong>{item.board}</strong>
                      </div>
                    </td>
                    <td data-label="Post Name" className="post-name-col">
                      <span className="cell-value">{item.title}</span>
                    </td>
                    <td data-label="Exam Date" className="eligibility-col">
                      <span className="cell-value">{item.qualification}</span>
                    </td>
                    <td data-label="Status" className="last-date-col">
                      <span className="cell-value">{item.lastDate}</span>
                    </td>
                    <td data-label="Action" className="action-col">
                      <Link href={`/articles/${getJobSlug(item)}`} className="btn-view">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-records">
                    No active admit card notifications matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
