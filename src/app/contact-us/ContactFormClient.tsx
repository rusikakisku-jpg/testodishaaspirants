'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactFormClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Recruitment Notification Query',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div
        style={{
          background: '#ecfdf5',
          border: '1px solid #10b981',
          borderRadius: '16px',
          padding: '32px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
          }}
        >
          <CheckCircle size={32} style={{ color: '#059669' }} />
        </div>
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#065f46',
            margin: '0 0 8px 0',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Inquiry Dispatched Successfully!
        </h3>
        <p
          style={{
            fontSize: '0.92rem',
            color: '#047857',
            maxWidth: '420px',
            margin: '0 auto 20px auto',
            lineHeight: 1.6,
          }}
        >
          Thank you, <strong>{formData.name}</strong>. Your ticket has been logged with reference to our editorial desk. We aim to respond within 24–48 business hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', category: 'Recruitment Notification Query', message: '' });
          }}
          style={{
            background: '#059669',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
          }}
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label
          htmlFor="contact-name"
          style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}
        >
          Full Name <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          placeholder="e.g. Ramesh Kumar Sahoo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '0.92rem',
            outline: 'none',
            background: '#ffffff',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label
          htmlFor="contact-email"
          style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}
        >
          Email Address <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          placeholder="e.g. ramesh.sahoo@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '0.92rem',
            outline: 'none',
            background: '#ffffff',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label
          htmlFor="contact-category"
          style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}
        >
          Inquiry Department <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <select
          id="contact-category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={{
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '0.92rem',
            outline: 'none',
            background: '#ffffff',
            cursor: 'pointer',
          }}
        >
          <option value="Recruitment Notification Query">Recruitment Notification Query (Dates/Syllabus)</option>
          <option value="CBT Mock Test Feedback">CBT Mock Test Feedback / Question Correction</option>
          <option value="PYQ Paper Submission">PYQ Question Paper Submission</option>
          <option value="Grievance / Legal Query">Grievance / Privacy / Legal Query</option>
          <option value="General Suggestion">General Feedback / Suggestion</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label
          htmlFor="contact-message"
          style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}
        >
          Your Message <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          placeholder="Please describe your query with relevant exam details or notification links..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          style={{
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '0.92rem',
            outline: 'none',
            background: '#ffffff',
            fontFamily: 'inherit',
            resize: 'vertical',
          }}
        />
      </div>

      <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>
        🔒 We respect your privacy. Your contact details are never shared or sold to third parties.
      </p>

      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? '#94a3b8' : '#0b4ca3',
          color: '#ffffff',
          border: 'none',
          padding: '13px 20px',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'background 0.2s ease',
        }}
      >
        <Send size={16} />
        {loading ? 'Transmitting Message...' : 'Send Inquiry Message'}
      </button>
    </form>
  );
}
