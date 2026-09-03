import React from 'react';
import { Sparkles, Shield, Target, Users } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#0b4ca3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
            <Sparkles style={{ width: '24px', height: '24px', color: '#ff7a00' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'Poppins' }}>
            About Odisha Aspirants
          </h1>
        </div>

        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', marginBottom: '25px' }}>
          <strong>Odisha Aspirants</strong> is dedicated to helping government job candidates across Odisha succeed in their exams. We provide free, fast, and accurate updates for OSSSC, OPSC, OSSC, Railway Recruitment Board (RRB), and Odisha Banking exams.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '20px', margin: '30px 0' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <Shield style={{ width: '28px', height: '28px', color: '#0b4ca3', marginBottom: '10px' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins' }}>100% Authentic Updates</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>Verified direct notifications from official recruitment boards.</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <Target style={{ width: '28px', height: '28px', color: '#059669', marginBottom: '10px' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins' }}>CBT Mock Tests</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>Real online exam interface for practice and confidence.</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <Users style={{ width: '28px', height: '28px', color: '#ff7a00', marginBottom: '10px' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins' }}>150,000+ Community</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>Join thousands of candidates preparing daily for competitive exams.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
