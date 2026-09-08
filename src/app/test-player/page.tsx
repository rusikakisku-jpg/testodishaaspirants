'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function TestPlayerPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/mock-test' + window.location.search);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: 'Poppins, sans-serif' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
        Redirecting to Official Mock Test...
      </h2>
      <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '20px' }}>
        Please wait while we redirect you to the CBT mock test portal.
      </p>
      <Link href="/mock-test" style={{ color: '#0b4ca3', fontWeight: 700, textDecoration: 'underline' }}>
        Click here if not redirected automatically &rarr;
      </Link>
    </div>
  );
}
