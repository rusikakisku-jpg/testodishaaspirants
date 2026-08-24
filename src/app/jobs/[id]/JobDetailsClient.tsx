'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JobItem } from '@/lib/data';
import { fetchJobDetailsApi, fetchJobsApi, getJobSlug } from '@/lib/api';
import {
  Calendar,
  ExternalLink,
  Download,
  Clock,
  ArrowRight,
  Briefcase,
  AlertCircle,
  GraduationCap,
  CheckCircle2,
  ChevronRight,
  Layers,
} from 'lucide-react';

interface JobDetailsClientProps {
  id: string;
  initialJob: JobItem | null;
  initialAllJobs: JobItem[];
}

export default function JobDetailsClient({ id, initialJob, initialAllJobs }: JobDetailsClientProps) {
  const [job, setJob] = useState<JobItem | null>(initialJob);
  const [allJobs, setAllJobs] = useState<JobItem[]>(initialAllJobs || []);

  useEffect(() => {
    async function refreshData() {
      try {
        const [singleJob, list] = await Promise.all([
          fetchJobDetailsApi(id),
          fetchJobsApi(),
        ]);
        if (singleJob) {
          setJob(singleJob);
        }
        if (list.length > 0) {
          setAllJobs(list);
        }
      } catch (e) {}
    }
    refreshData();
  }, [id]);

  if (!job) {
    return (
      <div style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 1.5rem', textAlign: 'center', color: '#ef4444' }}>
        Job entry not found.
      </div>
    );
  }

  const latestVacancies = allJobs
    ? allJobs.filter((j) => j.category === 'vacancy' && String(j.id) !== id).slice(0, 6)
    : [];

  return (
    <div className="sarkari-article-wrapper">
      {/* Breadcrumb Navigation */}
      <nav className="sarkari-breadcrumb" aria-label="breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={14} className="bread-sep" />
        <Link href="/latest-jobs">Latest Jobs</Link>
        <ChevronRight size={14} className="bread-sep" />
        <span className="bread-current">{job.board} {job.title}</span>
      </nav>

      {/* Main Layout Grid */}
      <div className="sarkari-layout-grid">
        {/* Left / Main Post Content */}
        <main className="sarkari-main-content">
          {/* Post Title & Quick Meta Box */}
          <div className="sarkari-title-box">
            <h1 className="sarkari-post-title">
              {job.board} {job.title} Recruitment 2026 – Apply Online for {job.vacancies} Posts
            </h1>
            <div className="sarkari-post-date-row">
              <span><strong>Post Update:</strong> {job.publishDate}</span>
              <span className="date-sep">|</span>
              <span><strong>By:</strong> Odisha Aspirants</span>
            </div>
          </div>

          {/* Master Structured Govt Table */}
          <div className="sarkari-master-table-card">
            {/* Header Banner */}
            <div className="sarkari-table-masthead">
              <h2>{job.boardFull} ({job.board})</h2>
              <h3>{job.title} Recruitment Notification 2026</h3>
              <p className="masthead-tagline">WWW.ODISHAASPIRANTS.COM</p>
            </div>

            {/* Short Information Summary inside Master Table */}
            <div className="sarkari-short-info-inside">
              <strong>Short Information: </strong>
              <span>
                <strong>{job.boardFull} ({job.board})</strong> has published the official recruitment advertisement for{' '}
                <strong>{job.title}</strong>. Candidates holding <strong>{job.qualification}</strong> eligibility can read the detailed recruitment advertisement and submit their application before the closing date <strong>{job.lastDate}</strong>.
              </span>
            </div>

            {/* 2-Column Split: Important Dates & Application Fee */}
            <div className="sarkari-two-col-grid">
              {/* Box 1: Important Dates */}
              <div className="sarkari-spec-box dates-box">
                <div className="spec-box-header">
                  <Calendar size={18} />
                  <h4>Important Milestone Dates</h4>
                </div>
                <ul className="spec-list">
                  <li>
                    <span className="spec-name">Application Start Date:</span>
                    <span className="spec-val"><strong>{job.publishDate}</strong></span>
                  </li>
                  <li>
                    <span className="spec-name">Last Date to Apply Online:</span>
                    <span className="spec-val highlight-red"><strong>{job.lastDate}</strong></span>
                  </li>
                  <li>
                    <span className="spec-name">Last Date Fee Payment:</span>
                    <span className="spec-val"><strong>{job.lastDate}</strong></span>
                  </li>
                  <li>
                    <span className="spec-name">Admit Card Release Date:</span>
                    <span className="spec-val">Notify Before Exam</span>
                  </li>
                  <li>
                    <span className="spec-name">Examination Date:</span>
                    <span className="spec-val">As per Official Schedule</span>
                  </li>
                </ul>
                {job.datesHtml && job.datesHtml !== '<p>Important dates details.</p>' && (
                  <div className="spec-html-extra" dangerouslySetInnerHTML={{ __html: job.datesHtml }} />
                )}
              </div>

              {/* Box 2: Application Fee */}
              <div className="sarkari-spec-box fees-box">
                <div className="spec-box-header">
                  <AlertCircle size={18} />
                  <h4>Application Fee Details</h4>
                </div>
                <ul className="spec-list">
                  <li>
                    <span className="spec-name">General / SEBC / OBC:</span>
                    <span className="spec-val">Refer Notification</span>
                  </li>
                  <li>
                    <span className="spec-name">SC / ST / PwD Candidates:</span>
                    <span className="spec-val">Exempted / As per Rules</span>
                  </li>
                  <li>
                    <span className="spec-name">Fee Payment Mode:</span>
                    <span className="spec-val">Online (Net Banking, Debit/Credit Card, UPI)</span>
                  </li>
                </ul>
                {job.feeHtml && job.feeHtml !== '<p>Application fee details.</p>' && (
                  <div className="spec-html-extra" dangerouslySetInnerHTML={{ __html: job.feeHtml }} />
                )}
              </div>
            </div>

            {/* Full Width Box: Age Limit Criteria */}
            <div className="sarkari-spec-box age-box">
              <div className="spec-box-header">
                <Clock size={18} />
                <h4>Age Limit Criteria (as on Notification)</h4>
              </div>
              <ul className="spec-list inline-spec">
                <li><span>Minimum Age: <strong>18 / 21 Years</strong> (Post-wise)</span></li>
                <li><span>Maximum Age: <strong>38 Years</strong></span></li>
                <li><span>Age Relaxation: <strong>Extra as per Odisha Government Rules (SC/ST/SEBC/Women/PwD).</strong></span></li>
              </ul>
            </div>

            {/* Full Width Box: Vacancy & Eligibility Table */}
            <div className="sarkari-spec-box vacancy-table-box">
              <div className="spec-box-header">
                <Briefcase size={18} />
                <h4>Vacancy Details &amp; Educational Qualification</h4>
              </div>
              <div className="table-responsive">
                <table className="sarkari-data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40%' }}>Post / Exam Name</th>
                      <th style={{ width: '20%', textAlign: 'center' }}>Total Vacancies</th>
                      <th style={{ width: '40%' }}>Eligibility / Qualification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong style={{ color: '#0f172a' }}>{job.title}</strong>
                        <div className="post-board-sub">{job.board} Recruitment 2026</div>
                      </td>
                      <td className="text-center highlight-blue">
                        <strong>{job.vacancies}</strong>
                      </td>
                      <td>
                        <strong>{job.qualification}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {job.eligibilityHtml && job.eligibilityHtml !== '<p>Please refer to eligibility details.</p>' && (
                <div className="spec-html-extra" style={{ padding: '15px' }} dangerouslySetInnerHTML={{ __html: job.eligibilityHtml }} />
              )}
            </div>

            {/* Syllabus & Exam Pattern Box (if available) */}
            {job.syllabusHtml && job.syllabusHtml !== '<p>Syllabus details.</p>' && (
              <div className="sarkari-spec-box syllabus-box">
                <div className="spec-box-header">
                  <GraduationCap size={18} />
                  <h4>Exam Syllabus &amp; Selection Process</h4>
                </div>
                <div className="spec-html-content" dangerouslySetInnerHTML={{ __html: job.syllabusHtml }} />
              </div>
            )}

            {/* How to Apply Guide Box */}
            <div className="sarkari-spec-box apply-guide-box">
              <div className="spec-box-header">
                <CheckCircle2 size={18} />
                <h4>How to Fill {job.board} {job.title} Online Application Form 2026</h4>
              </div>
              {job.applyHtml && job.applyHtml !== '<p>How to apply guidelines.</p>' ? (
                <div className="spec-html-content" dangerouslySetInnerHTML={{ __html: job.applyHtml }} />
              ) : (
                <ul className="apply-steps-list">
                  <li>Candidates can apply online between <strong>{job.publishDate}</strong> and <strong>{job.lastDate}</strong>.</li>
                  <li>Carefully read the official advertisement before filling the application for <strong>{job.title}</strong>.</li>
                  <li>Check and collect all necessary documents – Eligibility Proof, Photo ID, Address Details, and Basic Details.</li>
                  <li>Scan and keep all relevant certificates, signature, and photograph ready in specified formats.</li>
                  <li>Carefully check the preview and verify all details before submitting the online form.</li>
                  <li>Pay the application fee (if required) and download/print the final application receipt for future reference.</li>
                </ul>
              )}
            </div>

            {/* ⭐ Sarkari Important Links Table ⭐ */}
            <div className="sarkari-links-container">
              <div className="links-table-header">
                <h3>⭐ Important Useful Links</h3>
              </div>
              <table className="sarkari-links-table">
                <tbody>
                  <tr className="highlight-row">
                    <td className="link-title-col">
                      <strong>Apply Online ({job.ctaText || 'Registration / Login'})</strong>
                    </td>
                    <td className="link-action-col">
                      <a href={job.ctaUrl || '#'} target="_blank" rel="noopener noreferrer" className="sarkari-btn btn-apply-green">
                        Apply Online <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="link-title-col">
                      <strong>Download Official Notification (PDF)</strong>
                    </td>
                    <td className="link-action-col">
                      <a href={job.notificationUrl || '#'} target="_blank" rel="noopener noreferrer" className="sarkari-btn btn-pdf-blue">
                        <Download size={14} /> Download PDF
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="link-title-col">
                      <strong>{job.board} Official Website</strong>
                    </td>
                    <td className="link-action-col">
                      <a href={job.ctaUrl || '#'} target="_blank" rel="noopener noreferrer" className="sarkari-btn btn-link-gray">
                        Official Site <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="link-title-col">
                      <strong>Browse All Odisha Govt Jobs</strong>
                    </td>
                    <td className="link-action-col">
                      <Link href="/latest-jobs" className="sarkari-btn btn-link-blue">
                        Click Here <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Sidebar Column: Categories, Latest Jobs, Jobs by Qualification */}
        <aside className="sarkari-sidebar">
          {/* 1. Explore Categories */}
          <div className="sidebar-card">
            <h4 className="sidebar-title">
              <Layers size={16} className="sidebar-title-icon" /> Categories
            </h4>
            <ul className="sidebar-cat-list">
              <li>
                <Link href="/latest-jobs" className="sidebar-cat-item">
                  <span className="cat-name">Latest Jobs</span>
                  <ChevronRight size={14} className="cat-arrow" />
                </Link>
              </li>
              <li>
                <Link href="/admit-card" className="sidebar-cat-item">
                  <span className="cat-name">Admit Cards</span>
                  <ChevronRight size={14} className="cat-arrow" />
                </Link>
              </li>
              <li>
                <Link href="/answer-key" className="sidebar-cat-item">
                  <span className="cat-name">Answer Keys</span>
                  <ChevronRight size={14} className="cat-arrow" />
                </Link>
              </li>
              <li>
                <Link href="/result" className="sidebar-cat-item">
                  <span className="cat-name">Results &amp; Merit Lists</span>
                  <ChevronRight size={14} className="cat-arrow" />
                </Link>
              </li>
              <li>
                <Link href="/syllabus" className="sidebar-cat-item">
                  <span className="cat-name">Exam Syllabus</span>
                  <ChevronRight size={14} className="cat-arrow" />
                </Link>
              </li>
              <li>
                <Link href="/pyq" className="sidebar-cat-item">
                  <span className="cat-name">Previous Year Papers</span>
                  <ChevronRight size={14} className="cat-arrow" />
                </Link>
              </li>
              <li>
                <Link href="/notes" className="sidebar-cat-item">
                  <span className="cat-name">Study Notes</span>
                  <ChevronRight size={14} className="cat-arrow" />
                </Link>
              </li>
              <li>
                <Link href="/test-player" className="sidebar-cat-item">
                  <span className="cat-name">Online Mock Tests</span>
                  <span className="cat-badge-new">CBT</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Latest Jobs */}
          <div className="sidebar-card">
            <h4 className="sidebar-title">
              <Briefcase size={16} className="sidebar-title-icon" /> Latest Jobs
            </h4>
            <ul className="sidebar-jobs-list">
              {latestVacancies.length > 0 ? (
                latestVacancies.map((item) => (
                  <li key={item.id}>
                    <Link href={`/articles/${getJobSlug(item)}`} className="sidebar-job-card">
                      <div className="sidebar-job-badge-row">
                        <span className="sidebar-job-board">{item.board}</span>
                        <span className="sidebar-job-date">{item.publishDate}</span>
                      </div>
                      <div className="sidebar-job-name">{item.title}</div>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="sidebar-empty">No other vacancies available</li>
              )}
            </ul>
            <div className="sidebar-more-link-wrap">
              <Link href="/latest-jobs" className="sidebar-view-more">
                View All Latest Jobs &rarr;
              </Link>
            </div>
          </div>

          {/* 3. Jobs by Qualification */}
          <div className="sidebar-card">
            <h4 className="sidebar-title">
              <GraduationCap size={16} className="sidebar-title-icon" /> Jobs by Qualification
            </h4>
            <ul className="sidebar-qual-list">
              <li>
                <Link href="/latest-jobs" className="sidebar-qual-item">
                  <span>10th Pass / Matric Jobs</span>
                  <span className="qual-tag">10th</span>
                </Link>
              </li>
              <li>
                <Link href="/latest-jobs" className="sidebar-qual-item">
                  <span>12th / +2 Pass Jobs</span>
                  <span className="qual-tag">+2 / 12th</span>
                </Link>
              </li>
              <li>
                <Link href="/latest-jobs" className="sidebar-qual-item">
                  <span>Any Graduate Degree Jobs</span>
                  <span className="qual-tag">Graduate</span>
                </Link>
              </li>
              <li>
                <Link href="/latest-jobs" className="sidebar-qual-item">
                  <span>Diploma / Engineering Jobs</span>
                  <span className="qual-tag">Diploma</span>
                </Link>
              </li>
              <li>
                <Link href="/latest-jobs" className="sidebar-qual-item">
                  <span>B.Sc / Medical / Nursing Jobs</span>
                  <span className="qual-tag">Medical</span>
                </Link>
              </li>
              <li>
                <Link href="/latest-jobs" className="sidebar-qual-item">
                  <span>Post Graduate (PG) Jobs</span>
                  <span className="qual-tag">PG</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Sticky Bar */}
      <div className="mobile-sticky-action-bar">
        <div className="mobile-sticky-inner">
          <a href={job.ctaUrl || '#'} target="_blank" rel="noopener noreferrer" className="mob-btn mob-btn-apply">
            Apply Online
          </a>
          <a href={job.notificationUrl || '#'} target="_blank" rel="noopener noreferrer" className="mob-btn mob-btn-pdf">
            Notification PDF
          </a>
        </div>
      </div>
    </div>
  );
}
