import React from 'react';

export default function DisclaimerPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}>
        <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', fontFamily: 'Poppins' }}>
          Disclaimer Policy
        </h1>
        <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p>
            The information contained on Odisha Aspirants (https://odishaaspirants.com) is for general educational and informational purposes only.
          </p>
          <p>
            <strong>Not a Government Entity:</strong> Odisha Aspirants is an independent educational portal and is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with the Odisha Sub-Ordinate Staff Selection Commission (OSSSC), Odisha Public Service Commission (OPSC), Odisha Staff Selection Commission (OSSC), Railway Recruitment Boards (RRB), or any other government authority.
          </p>
          <p>
            <strong>Accuracy of Information:</strong> While we endeavor to keep recruitment details, dates, answer keys, and exam patterns up to date and correct, candidates are strictly advised to double-check official PDF notifications on respective official government portals.
          </p>
        </div>
      </div>
    </div>
  );
}
