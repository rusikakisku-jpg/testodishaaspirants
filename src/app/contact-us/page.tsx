import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, Clock, ShieldCheck, ChevronRight, HelpCircle, MessageSquare, AlertCircle } from 'lucide-react';
import ContactFormClient from './ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact Us | Odisha Aspirants - Support & Grievance Redressal',
  description:
    'Contact the Odisha Aspirants team for support, notification queries, exam paper submissions, content corrections, or grievance redressal. We respond within 24-48 business hours.',
  keywords: [
    'Contact Odisha Aspirants',
    'Odisha Aspirants Support Email',
    'Exam Query Support Odisha',
    'Grievance Redressal Odisha Aspirants',
  ],
};

export default function ContactUsPage() {
  const contactCards = [
    {
      icon: Mail,
      color: '#0b4ca3',
      bg: 'rgba(11, 76, 163, 0.08)',
      title: 'General & Candidate Support',
      detail: 'support@odishaaspirants.com',
      sub: 'Queries regarding notifications, admit cards, or CBT tests',
      href: 'mailto:support@odishaaspirants.com',
    },
    {
      icon: MessageSquare,
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.08)',
      title: 'Editorial & Content Desk',
      detail: 'editor@odishaaspirants.com',
      sub: 'Report a notification typo or submit exam question papers',
      href: 'mailto:support@odishaaspirants.com',
    },
    {
      icon: ShieldCheck,
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.08)',
      title: 'Grievance & Legal Officer',
      detail: 'grievance@odishaaspirants.com',
      sub: 'Privacy policy compliance & IT Act 2000 grievances',
      href: 'mailto:support@odishaaspirants.com',
    },
    {
      icon: Clock,
      color: '#ff7a00',
      bg: 'rgba(255, 122, 0, 0.08)',
      title: 'Operating Hours & SLA',
      detail: 'Mon – Sat: 9:00 AM – 6:00 PM IST',
      sub: 'Average email response turnaround: 24–48 hours',
    },
  ];

  const faqs = [
    {
      q: 'Does Odisha Aspirants charge any fee for government job applications?',
      a: 'Never. Odisha Aspirants is a 100% free educational information portal. We never collect application fees or sell appointment letters. All job applications and fee payments must be completed solely on official commission websites (e.g. opsc.gov.in, osssc.gov.in).',
    },
    {
      q: 'How can I report a date mismatch or error in an article?',
      a: 'We take accuracy very seriously. Please use the contact form on this page or email support@odishaaspirants.com with the article URL and the official commission PDF link. Our editorial team will verify and update the record immediately.',
    },
    {
      q: 'Are the CBT mock tests completely free to practice?',
      a: 'Yes, all mock tests and question paper archives on Odisha Aspirants are free for candidates to practice and test their timing and accuracy.',
    },
  ];

  return (
    <div style={{ maxWidth: '1050px', margin: '24px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b' }}>
        <Link href="/" style={{ color: '#0b4ca3', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#0f172a', fontWeight: 600 }}>Contact Us</span>
      </nav>

      {/* Main Card */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        {/* Header */}
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(11, 76, 163, 0.08)', color: '#0b4ca3', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.5px' }}>
            <Mail size={14} /> CANDIDATE SUPPORT &amp; GRIEVANCE DESK
          </div>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3 }}>
            Contact Odisha Aspirants
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
            Have a question about a recruitment circular, mock test issue, or content suggestion? Reach out to our team.
          </p>
        </header>

        {/* 2-Column Split: Details & Form */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '28px', marginBottom: '40px' }}>
          {/* Left Column: Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {contactCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '16px 18px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: card.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconComp size={20} style={{ color: card.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{card.title}</div>
                    {card.href ? (
                      <a
                        href={card.href}
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: '#0b4ca3',
                          textDecoration: 'none',
                          display: 'block',
                          margin: '2px 0',
                          wordBreak: 'break-all',
                        }}
                      >
                        {card.detail}
                      </a>
                    ) : (
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '2px 0' }}>
                        {card.detail}
                      </div>
                    )}
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{card.sub}</div>
                  </div>
                </div>
              );
            })}

            {/* Operating Address Card */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MapPin size={20} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Operating Headquarters</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '2px 0' }}>
                  Bhubaneswar, Odisha, PIN 751024, India
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Serving aspirants across all districts of Odisha
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Client Form */}
          <div>
            <ContactFormClient />
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <section style={{ borderTop: '1px solid #e2e8f0', paddingTop: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0b4ca3', fontSize: '0.82rem', fontWeight: 700, marginBottom: '8px' }}>
            <HelpCircle size={16} /> QUICK CANDIDATE CLARIFICATIONS
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 18px 0', fontFamily: 'Poppins, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}
              >
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins, sans-serif' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Statutory Notice */}
        <footer
          style={{
            marginTop: '32px',
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '12px',
            padding: '14px 18px',
            fontSize: '0.82rem',
            color: '#92400e',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertCircle size={18} style={{ color: '#d97706', flexShrink: 0 }} />
          <span>
            <strong>Statutory Reminder:</strong> Odisha Aspirants is an independent informational portal. For official application form submission, hall ticket download, or commission disputes, please visit the official websites at opsc.gov.in, osssc.gov.in, or ossc.gov.in.
          </span>
        </footer>
      </div>
    </div>
  );
}
