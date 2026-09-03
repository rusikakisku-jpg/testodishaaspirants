import React from 'react';

export default function TermsConditionsPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}>
        <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', fontFamily: 'Poppins' }}>
          Terms & Conditions
        </h1>
        <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p>Welcome to Odisha Aspirants! By accessing this website, you agree to comply with and be bound by the following terms and conditions of use.</p>
          <h3>1. License to Use</h3>
          <p>Unless otherwise stated, Odisha Aspirants owns the intellectual property rights for all material on this portal. All mock test materials and notes are for candidate educational practice.</p>
        </div>
      </div>
    </div>
  );
}
