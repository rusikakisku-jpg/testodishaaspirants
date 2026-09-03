import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}>
        <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', fontFamily: 'Poppins' }}>
          Privacy Policy
        </h1>
        <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p>At Odisha Aspirants, accessible from our portal, one of our main priorities is the privacy of our visitors.</p>
          <h3>1. Information We Collect</h3>
          <p>We do not collect personal identification information unless voluntarily provided when subscribing to updates or submitting contact inquiries.</p>
          <h3>2. Cookies and Web Beacons</h3>
          <p>Odisha Aspirants uses standard cookies to store information about visitors&apos; preferences and optimize web page user experience.</p>
        </div>
      </div>
    </div>
  );
}
