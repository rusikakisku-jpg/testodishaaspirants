'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JobItem } from '@/lib/data';
import { fetchJobDetailsApi, getJobSlug } from '@/lib/api';
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
  Share2,
} from 'lucide-react';

interface ArticleDetailsClientProps {
  slug: string;
  initialJob: JobItem | null;
  initialAllJobs: JobItem[];
}

export default function ArticleDetailsClient({ slug, initialJob, initialAllJobs }: ArticleDetailsClientProps) {
  const [job, setJob] = useState<JobItem | null>(initialJob);
  const otherJobs = initialAllJobs ? initialAllJobs.filter((j) => getJobSlug(j) !== slug).slice(0, 5) : [];

  useEffect(() => {
    if (!job && slug) {
      fetchJobDetailsApi(slug).then((res) => {
        if (res) setJob(res);
      });
    }
  }, [slug, job]);

  if (!job) {
    return (
      <div style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 1.5rem', textAlign: 'center', color: '#ef4444' }}>
        Article entry not found.
      </div>
    );
  }

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
            <div className="sarkari-board-badge-row">
              <span className="sarkari-board-badge">{job.board}</span>
              <span className="sarkari-status-badge">{job.status || 'Active Now'}</span>
            </div>
            <h1 className="sarkari-post-title">
              {job.board} {job.title} Recruitment 2026 – Apply Online for {job.vacancies} Posts
            </h1>
            <div className="sarkari-post-date-row">
              <span><strong>Post Date:</strong> {job.publishDate}</span>
              <span className="date-sep">|</span>
              <span><strong>Last Date:</strong> <span className="text-red font-bold">{job.lastDate}</span></span>
              <span className="date-sep">|</span>
              <span><strong>Category:</strong> {job.category ? job.category.toUpperCase() : 'VACANCY'}</span>
            </div>
          </div>

          {/* Short Information Summary */}
          <div className="sarkari-short-info">
            <strong>Short Information: </strong>
            <span>
              <strong>{job.boardFull} ({job.board})</strong> has published the official recruitment advertisement for{' '}
              <strong>{job.title}</strong>. Candidates holding <strong>{job.qualification}</strong> eligibility can read the detailed recruitment advertisement and submit their application before the closing date <strong>{job.lastDate}</strong>.
            </span>
          </div>

          {/* Master Structured Govt Table */}
          <div className="sarkari-master-table-card">
            {/* Header Banner */}
            <div className="sarkari-table-masthead">
              <h2>{job.boardFull} ({job.board})</h2>
              <h3>{job.title} Recruitment Notification 2026</h3>
              <p className="masthead-tagline">WWW.ODISHAASPIRANTS.COM</p>
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

        {/* Sidebar Column */}
        <aside className="sarkari-sidebar">
          {/* Quick Actions Card */}
          <div className="sidebar-card action-card">
            <h4 className="sidebar-title">Quick Action Links</h4>
            <a href={job.ctaUrl || '#'} target="_blank" rel="noopener noreferrer" className="side-btn side-btn-apply">
              🚀 Apply Online
            </a>
            <a href={job.notificationUrl || '#'} target="_blank" rel="noopener noreferrer" className="side-btn side-btn-notif">
              📄 Official PDF Notification
            </a>
          </div>

          {/* About Board Info */}
          <div className="sidebar-card about-board-card">
            <h4 className="sidebar-title">About {job.board}</h4>
            <div className="board-full-badge">{job.boardFull}</div>
            <p className="board-desc">
              The <strong>{job.boardFull}</strong> conducts state-level recruitment and selection examinations for government vacancies across Odisha.
            </p>
            <Link href="/latest-jobs" className="side-board-link">
              View all {job.board} jobs &rarr;
            </Link>
          </div>

          {/* Other Latest Jobs */}
          {otherJobs.length > 0 && (
            <div className="sidebar-card other-jobs-card">
              <h4 className="sidebar-title">Other Odisha Jobs</h4>
              <ul className="other-jobs-list">
                {otherJobs.map((oj) => (
                  <li key={oj.id}>
                    <Link href={`/articles/${getJobSlug(oj)}`} className="other-job-item">
                      <span className="other-job-board">{oj.board}</span>
                      <span className="other-job-title">{oj.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
