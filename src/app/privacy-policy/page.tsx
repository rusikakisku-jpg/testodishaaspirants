import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, Mail, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Odisha Aspirants - Data Protection & AdSense Compliance',
  description:
    'Read the official Privacy Policy of Odisha Aspirants. Learn how we handle and protect user data, our use of cookies, Google AdSense & DoubleClick DART compliance, GDPR, and CCPA rights.',
  keywords: [
    'Odisha Aspirants Privacy Policy',
    'Google AdSense Cookie Policy',
    'DART Cookies',
    'Data Protection',
    'GDPR CCPA Odisha Aspirants',
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '24px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b' }}>
        <Link href="/" style={{ color: '#0b4ca3', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#0f172a', fontWeight: 600 }}>Privacy Policy</span>
      </nav>

      {/* Main Container */}
      <article style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        {/* Header Strip */}
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(11, 76, 163, 0.08)', color: '#0b4ca3', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.5px' }}>
            <Shield size={14} /> OFFICIAL LEGAL POLICY • ADSENSE &amp; GDPR COMPLIANT
          </div>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3 }}>
            Privacy Policy of Odisha Aspirants
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.92rem' }}>
            <strong>Last Updated:</strong> September 2026 | <strong>Effective Date:</strong> Immediate
          </p>
        </header>

        {/* Highlight Summary Box */}
        <section aria-label="Policy Summary" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '18px 20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Lock style={{ width: '22px', height: '22px', color: '#059669', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h2 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins, sans-serif' }}>
                Our Commitment to Your Privacy
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                At <strong>Odisha Aspirants</strong> (accessible from <a href="https://odishaaspirants.com" style={{ color: '#0b4ca3', fontWeight: 600 }}>https://odishaaspirants.com</a>), the privacy and data security of our students and visitors are among our highest priorities. This document outlines the types of information we collect, how it is handled, and our full compliance with Google AdSense, GDPR, CCPA, and Indian Information Technology regulations.
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Section 1 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              1. Information We Collect
            </h2>
            <p>
              We adhere strictly to data minimization principles. We only collect information that is strictly necessary for providing recruitment updates, serving educational mock test assessments, and ensuring website stability:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Voluntarily Provided Information:</strong> When you contact our support team via our contact form or email, we may collect your full name, email address, subject matter, and the contents of your message.
              </li>
              <li>
                <strong>CBT Mock Test Performance Data:</strong> When participating in our interactive Computer Based Test (CBT) mock simulations, test response answers, completion time, and scores are processed client-side to generate your personalized result scorecard.
              </li>
              <li>
                <strong>Non-Personal &amp; Device Information:</strong> Standard browser header data, operating system, language preferences, referring URLs, and general geographic location (country/city level) collected through automated server analytics.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              2. Standard Log Files
            </h2>
            <p>
              Odisha Aspirants follows a standard procedure of utilizing log files. These files log visitors when they visit web pages. Standard internet logging records include Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, and number of page clicks. This information is not linked to any information that is personally identifiable. The purpose of this information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information to optimize server bandwidth.
            </p>
          </section>

          {/* Section 3 - Google AdSense & Cookies (Crucial for AdSense) */}
          <section style={{ background: '#f8fafc', borderLeft: '4px solid #0b4ca3', padding: '18px 20px', borderRadius: '0 12px 12px 0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={20} style={{ color: '#0b4ca3' }} /> 3. Google AdSense &amp; DoubleClick DART Cookies
            </h2>
            <p>
              Google is a third-party vendor on our site. It also uses cookies, known as <strong>DART cookies</strong>, to serve advertisements to our site visitors based upon their visit to <a href="https://odishaaspirants.com" style={{ color: '#0b4ca3' }}>odishaaspirants.com</a> and other sites on the internet.
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our sites and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting Google Ad Settings at:{' '}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0b4ca3', fontWeight: 600, wordBreak: 'break-all' }}>
                  https://adssettings.google.com
                </a>
              </li>
              <li>
                Alternatively, visitors can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting the Network Advertising Initiative Opt-Out Page at:{' '}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: '#0b4ca3', fontWeight: 600, wordBreak: 'break-all' }}>
                  https://www.aboutads.info/choices/
                </a>
              </li>
              <li>
                For more details regarding how Google uses information from sites that use its services, please review Google&apos;s Partner Policy at:{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color: '#0b4ca3', fontWeight: 600, wordBreak: 'break-all' }}>
                  https://policies.google.com/technologies/partner-sites
                </a>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              4. Third-Party Advertising Partners
            </h2>
            <p>
              Some of the advertisers and analytical partners on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Odisha Aspirants. These are sent directly to users&apos; browsers and automatically receive your IP address. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p style={{ fontStyle: 'italic', color: '#64748b' }}>
              Note: Odisha Aspirants has no access to or control over these cookies that are used by third-party advertisers.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              5. Managing &amp; Disabling Cookies
            </h2>
            <p>
              You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '14px 0' }}>
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies
              </div>
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>Mozilla Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies
              </div>
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Block all cookies
              </div>
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>Microsoft Edge:</strong> Settings &gt; Site permissions &gt; Cookies
              </div>
            </div>
          </section>

          {/* Section 6 - CCPA Rights */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              6. CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
            <p>
              Under the California Consumer Privacy Act (CCPA), California consumers have the right to:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Request that a business disclose the categories and specific pieces of personal data collected.</li>
              <li>Request that a business delete any personal data about the consumer that a business collected.</li>
              <li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data. <em>(Odisha Aspirants does not sell, rent, or trade your personal data under any circumstances).</em></li>
            </ul>
            <p>If you make a request, we have one month to respond to you. Please contact us to exercise these rights.</p>
          </section>

          {/* Section 7 - GDPR Data Protection Rights */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              7. GDPR Data Protection Rights
            </h2>
            <p>
              We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
              <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization.</li>
            </ul>
          </section>

          {/* Section 8 - COPPA Compliance */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              8. Children&apos;s Online Privacy Protection (COPPA)
            </h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Odisha Aspirants does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              9. External Links to Government &amp; Third-Party Websites
            </h2>
            <p>
              Our website contains links to official government recruitment commissions (e.g., OPSC, OSSSC, OSSC, Odisha Police) and notification PDF documents. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif' }}>
              10. Consent &amp; Policy Updates
            </h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms. We may update our Privacy Policy periodically. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          {/* Section 11 - Grievance Officer & Contact Block */}
          <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 24px', marginTop: '10px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} style={{ color: '#0b4ca3' }} /> 11. Grievance Redressal &amp; Privacy Officer
            </h2>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.92rem', color: '#475569' }}>
              In accordance with the Information Technology Act, 2000 and rules made thereunder, if you have any questions or grievances regarding this Privacy Policy, please contact our designated officer:
            </p>
            <div style={{ fontSize: '0.9rem', color: '#1e293b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>Website:</strong> Odisha Aspirants (<a href="https://odishaaspirants.com" style={{ color: '#0b4ca3' }}>odishaaspirants.com</a>)</div>
              <div><strong>Grievance &amp; Privacy Email:</strong> <a href="mailto:support@odishaaspirants.com" style={{ color: '#0b4ca3', fontWeight: 600 }}>support@odishaaspirants.com</a></div>
              <div><strong>Location:</strong> Bhubaneswar, Odisha, PIN 751024, India</div>
              <div><strong>Response Turnaround:</strong> Within 24-48 business hours</div>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
