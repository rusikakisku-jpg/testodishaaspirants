'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function JobsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/latest-jobs');
  }, [router]);

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Poppins, sans-serif' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid #e2e8f0',
          borderTop: '3px solid #0b4ca3',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px auto',
        }}
      />
      <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Redirecting to Latest Jobs...</p>
    </div>
  );
}
