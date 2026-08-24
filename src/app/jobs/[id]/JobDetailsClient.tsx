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
  Share2,
  Copy,
  Check,
} from 'lucide-react';

interface JobDetailsClientProps {
  id: string;
  initialJob: JobItem | null;
  initialAllJobs: JobItem[];
}

export default function JobDetailsClient({ id, initialJob, initialAllJobs }: JobDetailsClientProps) {
  const [job, setJob] = useState<JobItem | null>(initialJob);
  const [allJobs, setAllJobs] = useState<JobItem[]>(initialAllJobs || []);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

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

  const shareTitle = `${job.board} ${job.title} Recruitment 2026 - Apply Online Details`;
  const urlToShare = currentUrl || (typeof window !== 'undefined' ? window.location.href : `https://odishaaspirants.com/jobs/${id}`);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + '\n' + urlToShare)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(shareTitle)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(urlToShare)}`,
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(urlToShare).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

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
          <div className="sarkari-master-table-card">
            {/* Post Title & Quick Meta Row */}
            <div className="sarkari-title-section">
              <h1 className="sarkari-post-title">
                {job.board} {job.title} Recruitment 2026 – Apply Online for {job.vacancies} Posts
              </h1>
              <div className="sarkari-post-date-row">
                <span><strong>Post Update:</strong> {job.publishDate}</span>
                <span className="date-sep">|</span>
                <span><strong>By:</strong> Odisha Aspirants</span>
              </div>
            </div>

            {/* Short Information Summary */}
            <div className="sarkari-short-info-section">
              <strong>Short Information: </strong>
              <span>
                <strong>{job.boardFull} ({job.board})</strong> has published the official recruitment advertisement for{' '}
                <strong>{job.title}</strong>. Candidates holding <strong>{job.qualification}</strong> eligibility can read the detailed recruitment advertisement and submit their application before the closing date <strong>{job.lastDate}</strong>.
              </span>
            </div>

            {/* Social Media Sharing Bar (Between Short Info and Table Masthead) */}
            <div className="sarkari-share-bar">
              <span className="share-label">
                <Share2 size={15} /> Share Post:
              </span>
              <div className="share-buttons-group">
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn share-whatsapp"
                  aria-label="Share on WhatsApp"
                  title="Share on WhatsApp"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <a
                  href={shareLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn share-telegram"
                  aria-label="Share on Telegram"
                  title="Share on Telegram"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
                  </svg>
                  <span>Telegram</span>
                </a>

                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn share-facebook"
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>

                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn share-twitter"
                  aria-label="Share on X"
                  title="Share on X"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Share</span>
                </a>

                <button
                  onClick={handleCopyLink}
                  className={`share-btn share-copy ${copied ? 'copied' : ''}`}
                  aria-label="Copy Link"
                  title="Copy Page Link"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

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
