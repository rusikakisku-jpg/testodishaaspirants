import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertOctagon, ShieldAlert, ChevronRight, ExternalLink, Mail, Info, FileWarning } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Official Disclaimer | Odisha Aspirants - Non-Government Portal Declaration',
  description:
    'Important official disclaimer of Odisha Aspirants. We are an independent educational portal NOT affiliated with OPSC, OSSC, OSSSC, or the Odisha Government. Read our full advisory.',
  keywords: [
    'Odisha Aspirants Disclaimer',
    'Non Government Entity Notice',
    'OPSC OSSC OSSSC Disclaimer',
    'Exam Advisory Odisha',
  ],
};

export default function DisclaimerPage() {
  const officialPortals = [
    { name: 'Odisha Public Service Commission (OPSC)', url: 'https://opsc.gov.in', domain: 'opsc.gov.in' },
    { name: 'Odisha Staff Selection Commission (OSSC)', url: 'https://ossc.gov.in', domain: 'ossc.gov.in' },
    { name: 'Odisha Sub-Ordinate Staff Selection Commission (OSSSC)', url: 'https://osssc.gov.in', domain: 'osssc.gov.in' },
    { name: 'Odisha Police State Board', url: 'https://odishapolice.gov.in', domain: 'odishapolice.gov.in' },
    { name: 'Railway Recruitment Control Board (RRB)', url: 'https://indianrailways.gov.in', domain: 'indianrailways.gov.in' },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '24px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b' }}>
        <Link href="/" style={{ color: '#0b4ca3', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#0f172a', fontWeight: 600 }}>Disclaimer</span>
      </nav>

      {/* Main Container */}
      <article style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        {/* Header Strip */}
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(239, 68, 68, 0.08)', color: '#dc2626', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.5px' }}>
            <AlertOctagon size={14} /> MANDATORY STATUTORY NOTICE • ASPIRANT ADVISORY
          </div>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3 }}>
            Disclaimer &amp; Non-Affiliation Policy
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.92rem' }}>
            <strong>Last Revised:</strong> September 2026 | <strong>Status:</strong> Active &amp; Legally Binding
          </p>
        </header>

        {/* High-Visibility Red Banner: Non-Government Entity Declaration */}
        <section aria-label="Critical Non-Government Notice" style={{ background: '#fef2f2', border: '2px solid #fecaca', borderRadius: '14px', padding: '20px 22px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <ShieldAlert style={{ width: '26px', height: '26px', color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#991b1b', margin: '0 0 8px 0', fontFamily: 'Poppins, sans-serif' }}>
                IMPORTANT NOTICE: NOT A GOVERNMENT WEBSITE
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#7f1d1d', margin: 0, lineHeight: 1.6 }}>
                <strong>Odisha Aspirants</strong> (<a href="https://odishaaspirants.com" style={{ color: '#991b1b', fontWeight: 700, textDecoration: 'underline' }}>https://odishaaspirants.com</a>) is an <strong>independent, private educational blog and exam preparation website</strong>. We are <strong>NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with the Government of Odisha, the Government of India, or any recruitment commission</strong> including OPSC, OSSC, OSSSC, or Odisha Police.
              </p>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Section 1 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              1. General Informational &amp; Educational Purpose
            </h2>
            <p>
              All information, job vacancy tables, dates, eligibility criteria, admit card notices, answer key updates, syllabus guides, and previous year question papers hosted on this portal are published in good faith for <strong>general informational and academic guidance purposes only</strong>.
            </p>
            <p>
              While our editorial staff makes earnest efforts to gather accurate updates from official gazettes and recruitment circulars, Odisha Aspirants makes no warranties about the completeness, reliability, and absolute accuracy of this information. Any action you take upon the information you find on this website is strictly at your own risk.
            </p>
          </section>

          {/* Section 2 - Official Sources List */}
          <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 22px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={18} style={{ color: '#0b4ca3' }} /> 2. Official Government Verification Portals
            </h2>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.92rem' }}>
              Candidates are strongly encouraged to always cross-verify all recruitment circulars on the respective official statutory websites:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              {officialPortals.map((portal, idx) => (
                <a
                  key={idx}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#ffffff',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    textDecoration: 'none',
                    color: '#0f172a',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    transition: 'border-color 0.2s',
                  }}
                >
                  <span>{portal.name}</span>
                  <ExternalLink size={14} style={{ color: '#64748b', flexShrink: 0 }} />
                </a>
              ))}
            </div>
          </section>

          {/* Section 3 - Anti-Fraud Advisory */}
          <section style={{ background: '#fffbeb', borderLeft: '4px solid #d97706', padding: '16px 20px', borderRadius: '0 10px 10px 0' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#92400e', margin: '0 0 8px 0', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileWarning size={18} style={{ color: '#d97706' }} /> 3. Anti-Fraud Advisory: No Job Selling or Paid Appointments
            </h2>
            <p style={{ color: '#78350f', margin: 0, fontSize: '0.92rem' }}>
              <strong>Odisha Aspirants does NOT collect application fees, conduct recruitment, issue joining letters, or sell government appointments.</strong> All applications and examination fees must be paid exclusively through the official portals of the respective government recruitment authorities. Beware of fraudsters claiming to offer government jobs on behalf of any entity.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              4. Examination Dates, Fees, and Syllabi Modifications
            </h2>
            <p>
              Recruitment commissions reserve the unilateral authority to alter examination dates, cancel recruitment processes, change test centers, or modify syllabus criteria without advance notice. Odisha Aspirants will not be held liable for losses incurred due to rescheduled examination dates, postponement, or changes in eligibility criteria.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              5. Interactive CBT Mock Tests &amp; Scoring Disclaimer
            </h2>
            <p>
              The mock tests and Computer Based Test (CBT) simulations available on this portal are developed solely for candidate practice, speed optimization, and self-assessment:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Marks scored in mock tests do not guarantee qualification or selection in any official exam.</li>
              <li>Question difficulty and syllabus coverage represent educational approximations based on past exam trends.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              6. External Hyperlinks &amp; Third-Party Advertisements
            </h2>
            <p>
              Through our website, you can visit other websites by following hyperlinks to external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. The presence of any links on our site does not imply a recommendation for all the content found on these sites.
            </p>
            <p>
              Advertisements appearing on Odisha Aspirants are delivered by Google AdSense and third-party advertising networks. The products or services advertised are not endorsed or verified by Odisha Aspirants.
            </p>
          </section>

          {/* Section 7 - Contact & Error Reporting */}
          <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 24px', marginTop: '10px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} style={{ color: '#0b4ca3' }} /> 7. Reporting Errors &amp; Editorial Corrections
            </h2>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.92rem', color: '#475569' }}>
              If you discover an error, outdated notification date, or broken link on our website, we appreciate your feedback so we can rectify it promptly:
            </p>
            <div style={{ fontSize: '0.9rem', color: '#1e293b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>Editorial Feedback:</strong> <a href="mailto:support@odishaaspirants.com" style={{ color: '#0b4ca3', fontWeight: 600 }}>support@odishaaspirants.com</a></div>
              <div><strong>Website:</strong> <a href="https://odishaaspirants.com" style={{ color: '#0b4ca3' }}>https://odishaaspirants.com</a></div>
              <div><strong>Operating Base:</strong> Bhubaneswar, Odisha, India</div>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
