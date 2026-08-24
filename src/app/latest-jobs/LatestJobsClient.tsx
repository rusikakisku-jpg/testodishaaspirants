'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JobItem } from '@/lib/data';
import { fetchJobsApi, getJobSlug } from '@/lib/api';
import { Search } from 'lucide-react';

export default function LatestJobsClient({ initialJobs }: { initialJobs: JobItem[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);

  useEffect(() => {
    async function refreshData() {
      try {
        const data = await fetchJobsApi();
        if (data.length > 0) setJobs(data);
      } catch (e) {}
    }
    refreshData();
  }, []);

  const filteredJobs = jobs.filter((j) => {
    const isJobCategory = j.category === 'vacancy';
    const matchesSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.board.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.boardFull.toLowerCase().includes(searchTerm.toLowerCase());
    return isJobCategory && matchesSearch;
  });

  return (
    <>
      <div className="container">
        {/* Section Header & Search Row matching odishaaspirants.com/latest-jobs */}
        <div className="header-search-row">
          <div className="page-header">
            <h1>Latest Jobs</h1>
            <p>Latest government job openings and recruitment notifications.</p>
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

        {/* Listing Table matching odishaaspirants.com/latest-jobs */}
        <div className="table-card">
          <table className="jobs-table" id="jobsTable">
            <thead>
              <tr>
                <th style={{ width: '160px' }}>Publish Date</th>
                <th style={{ width: '250px' }}>Board</th>
                <th>Post Name</th>
                <th>Eligibility</th>
                <th style={{ width: '160px' }}>Last Date</th>
                <th className="action-col" style={{ width: '140px' }}>More</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td data-label="Publish Date" className="publish-date-col">
                      <span className="cell-value">{job.publishDate}</span>
                    </td>
                    <td data-label="Board" className="board-col">
                      <div className="cell-value board-col">
                        <strong>{job.board}</strong>
                      </div>
                    </td>
                    <td data-label="Post Name" className="post-name-col">
                      <span className="cell-value">{job.title}</span>
                    </td>
                    <td data-label="Eligibility" className="eligibility-col">
                      <span className="cell-value">{job.qualification}</span>
                    </td>
                    <td data-label="Last Date" className="last-date-col">
                      <span className="cell-value">{job.lastDate}</span>
                    </td>
                    <td data-label="Action" className="action-col">
                      <Link href={`/articles/${getJobSlug(job)}`} className="btn-view">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-records">
                    No active job vacancies matching your search criteria.
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
