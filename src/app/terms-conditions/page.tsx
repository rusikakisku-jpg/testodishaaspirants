import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Scale, Mail, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Odisha Aspirants - User Agreement & Rules',
  description:
    'Read the official Terms and Conditions of Odisha Aspirants. Understand guidelines for educational content usage, mock tests, intellectual property, disclaimers, and governing laws.',
  keywords: [
    'Odisha Aspirants Terms and Conditions',
    'User Agreement Odisha Aspirants',
    'Mock Test Fair Use',
    'Educational Terms Odisha',
  ],
};

export default function TermsConditionsPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '24px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b' }}>
        <Link href="/" style={{ color: '#0b4ca3', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#0f172a', fontWeight: 600 }}>Terms &amp; Conditions</span>
      </nav>

      {/* Main Container */}
      <article style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        {/* Header Strip */}
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(11, 76, 163, 0.08)', color: '#0b4ca3', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.5px' }}>
            <Scale size={14} /> LEGAL USER AGREEMENT • TERMS OF SERVICE
          </div>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3 }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.92rem' }}>
            <strong>Effective Date:</strong> September 2026 | <strong>Jurisdiction:</strong> Bhubaneswar, Odisha, India
          </p>
        </header>

        {/* Warning Notice Box */}
        <section aria-label="Non-Government Affiliation Warning" style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '14px', padding: '18px 20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <AlertTriangle style={{ width: '22px', height: '22px', color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h2 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#92400e', margin: '0 0 6px 0', fontFamily: 'Poppins, sans-serif' }}>
                Non-Government Affiliation Declaration
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#78350f', margin: 0, lineHeight: 1.6 }}>
                <strong>Odisha Aspirants</strong> is an independent educational portal. We are <strong>NOT</strong> an official agency, subsidiary, or affiliated body of the Odisha Public Service Commission (OPSC), Odisha Staff Selection Commission (OSSC), Odisha Sub-Ordinate Staff Selection Commission (OSSSC), Odisha Police State Board, or the Government of Odisha. All government names, acronyms, and trademarks belong to their respective statutory owners.
              </p>
            </div>
          </div>
        </section>

        {/* Content Clauses */}
        <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Clause 1 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing any feature of <strong>Odisha Aspirants</strong> (<a href="https://odishaaspirants.com" style={{ color: '#0b4ca3' }}>odishaaspirants.com</a>), you signify your unconditional acceptance of and agreement to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          {/* Clause 2 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              2. Permitted Use &amp; Educational Purpose
            </h2>
            <p>
              All materials provided on this platform—including examination recruitment alerts, vacancy tables, eligibility guides, PDF syllabus summaries, previous year question papers (PYQs), study handbooks, and Computer Based Test (CBT) mock tests—are offered strictly for <strong>educational, informational, and personal preparation purposes</strong>.
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Candidates may view, download, and practice materials for non-commercial study purposes.</li>
              <li>You may not modify, distribute, publish, transmit, or sell any study handbook or question bank created by Odisha Aspirants without prior written consent.</li>
            </ul>
          </section>

          {/* Clause 3 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              3. User Conduct &amp; Prohibited Activities
            </h2>
            <p>When using Odisha Aspirants, you agree not to engage in any of the following activities:</p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Using automated crawlers, scrapers, data-mining tools, or bots to harvest post details or question items.</li>
              <li>Attempting to probe, scan, or test the vulnerability of the system or network or breach security authentication.</li>
              <li>Submitting fraudulent inquiries or malicious scripts through our contact forms.</li>
              <li>Disrupting normal website flow or imposing an unreasonable burden on server infrastructure.</li>
            </ul>
          </section>

          {/* Clause 4 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              4. Verification of Recruitment Notifications &amp; Official Dates
            </h2>
            <p>
              While our editorial staff takes utmost care to cross-verify recruitment notifications, application deadlines, fee amounts, eligibility criteria, and exam dates from authentic official gazettes and commission websites, <strong>discrepancies, amendments, or last-minute extensions may occur by official authorities</strong>.
            </p>
            <p style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '10px', borderLeft: '4px solid #059669', color: '#065f46', fontWeight: 500 }}>
              <strong>Mandatory Candidate Instruction:</strong> Candidates are strictly advised to download the official PDF advertisement from the respective commission&apos;s official portal before paying application fees or submitting online forms. Odisha Aspirants will not be held responsible for errors or missed deadlines.
            </p>
          </section>

          {/* Clause 5 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              5. CBT Mock Test Simulation Policy
            </h2>
            <p>
              Our interactive CBT Mock Test engine is designed to familiarize candidates with computerized examination formats:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Mock tests do not guarantee selection or predict exact scores in official exams.</li>
              <li>Questions are curated from memory-based past papers, official syllabi, and model test papers.</li>
              <li>Negative marking rules (-0.25) are simulated to provide realistic practice.</li>
            </ul>
          </section>

          {/* Clause 6 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              6. Third-Party Links &amp; External Advertisements
            </h2>
            <p>
              Odisha Aspirants may contain links to external government web portals (e.g., opsc.gov.in, osssc.gov.in) and display advertisements served by Google AdSense and other advertising networks. We have no control over the content, privacy practices, or goods/services offered on third-party sites. Accessing external links is solely at your own risk.
            </p>
          </section>

          {/* Clause 7 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              7. Disclaimer of Warranties &amp; Limitation of Liability
            </h2>
            <p>
              The materials on Odisha Aspirants are provided on an &apos;as is&apos; and &apos;as available&apos; basis. Odisha Aspirants makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
            <p>
              In no event shall Odisha Aspirants, its creators, or partners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the portal.
            </p>
          </section>

          {/* Clause 8 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              8. Intellectual Property &amp; Copyright Notice
            </h2>
            <p>
              All original text, UI designs, code, branding assets, custom mock test questionnaires, and handbooks developed by Odisha Aspirants are protected under Indian Copyright laws. Official examination notifications, government gazettes, and recruitment question papers are the public domain or statutory property of the issuing commissions.
            </p>
          </section>

          {/* Clause 9 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              9. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or relating to this portal shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>Bhubaneswar, Odisha, India</strong>.
            </p>
          </section>

          {/* Clause 10 - Contact & Revisions */}
          <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 24px', marginTop: '10px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} style={{ color: '#0b4ca3' }} /> 10. Modifications &amp; Legal Queries
            </h2>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.92rem', color: '#475569' }}>
              Odisha Aspirants may revise these terms of service at any time without prior notice. For questions regarding these terms:
            </p>
            <div style={{ fontSize: '0.9rem', color: '#1e293b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>Email:</strong> <a href="mailto:support@odishaaspirants.com" style={{ color: '#0b4ca3', fontWeight: 600 }}>support@odishaaspirants.com</a></div>
              <div><strong>Website:</strong> <a href="https://odishaaspirants.com" style={{ color: '#0b4ca3' }}>https://odishaaspirants.com</a></div>
              <div><strong>Registered City:</strong> Bhubaneswar, Odisha, India</div>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
