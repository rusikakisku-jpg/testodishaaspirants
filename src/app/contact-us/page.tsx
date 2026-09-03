'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}>
        <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins' }}>
          Contact Support Team
        </h1>
        <p style={{ color: '#64748b', margin: '0 0 25px 0', fontSize: '0.95rem' }}>
          Have a question regarding recruitment notifications, syllabus, or CBT mock tests? Send us a message below.
        </p>

        <div className="contact-layout-grid">
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                <Mail style={{ width: '22px', height: '22px', color: '#0b4ca3' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Email Support</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>support@odishaaspirants.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                <MapPin style={{ width: '22px', height: '22px', color: '#0b4ca3' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Location</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>Bhubaneswar, Odisha, India</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#065f46', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <CheckCircle style={{ width: '32px', height: '32px', color: '#10b981', margin: '0 auto 10px auto' }} />
                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.1rem' }}>Message Sent Successfully!</h3>
                <p style={{ margin: 0, fontSize: '0.88rem' }}>Our team will respond to your query within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>Your Name *</label>
                  <input type="text" required placeholder="Enter full name" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>Email Address *</label>
                  <input type="email" required placeholder="name@example.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>Message *</label>
                  <textarea rows={4} required placeholder="Write your message or inquiry..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}></textarea>
                </div>

                <button type="submit" style={{ background: '#0b4ca3', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Send style={{ width: '16px', height: '16px' }} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
