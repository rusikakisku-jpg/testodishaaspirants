import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Shield, Target, BookOpen, ChevronRight, Award, Compass, FileText, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Odisha Aspirants - Trusted Govt Exam Portal & CBT Engine',
  description:
    'Learn about Odisha Aspirants. Our mission is to provide authentic government recruitment alerts (OPSC, OSSC, OSSSC, Police), free CBT mock tests, and verified study resources to candidates across Odisha.',
  keywords: [
    'About Odisha Aspirants',
    'Odisha Govt Exam Preparation',
    'OSSSC OSSC OPSC Mock Tests',
    'Odisha Aspirants Team',
  ],
};

export default function AboutUsPage() {
  const corePillars = [
    {
      icon: Shield,
      color: '#0b4ca3',
      bg: 'rgba(11, 76, 163, 0.08)',
      title: '100% Verified Updates',
      desc: 'Every vacancy, admit card date, and answer key is cross-verified against official state government gazettes and commission circulars.',
    },
    {
      icon: Target,
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.08)',
      title: 'Real-Time CBT Mock Tests',
      desc: 'Free computerized test practice simulating official OSSSC & OSSC interfaces with negative score deduction (-0.25) and timers.',
    },
    {
      icon: BookOpen,
      color: '#ff7a00',
      bg: 'rgba(255, 122, 0, 0.08)',
      title: '10-Year PYQ Archives',
      desc: 'Direct, free PDF downloads of previous year question papers and official solved keys from 2015 to 2026 without paywalls.',
    },
    {
      icon: FileText,
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.08)',
      title: 'Odisha Exam Handbooks',
      desc: 'Subject-specific study capsules covering Odisha History, Odia Grammar (ଓଡ଼ିଆ ବ୍ୟାକରଣ), Geography, and General Awareness.',
    },
  ];

  const verificationSteps = [
    {
      step: '01',
      title: 'Source Identification',
      desc: 'Direct monitoring of official recruitment commission websites (opsc.gov.in, osssc.gov.in, ossc.gov.in, odishapolice.gov.in) and state employment gazettes.',
    },
    {
      step: '02',
      title: 'Document Verification',
      desc: 'Our editorial team scrutinizes the official notification PDF to extract crucial details: eligibility, age limits, pay scale, and reservation breakdowns.',
    },
    {
      step: '03',
      title: 'Candidate-Friendly Synthesis',
      desc: 'Complex multi-page government notifications are structured into our standardized FreeJobAlert-style tables for instant readability.',
    },
    {
      step: '04',
      title: 'Continuous Tracking',
      desc: 'We track corringenda, deadline extensions, admit card releases, objection trackers, and final results until the recruitment cycle completes.',
    },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '24px auto', padding: '0 clamp(0.75rem, 3vw, 1.5rem)' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b' }}>
        <Link href="/" style={{ color: '#0b4ca3', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#0f172a', fontWeight: 600 }}>About Us</span>
      </nav>

      {/* Main Container */}
      <article style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        {/* Header Strip */}
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(11, 76, 163, 0.08)', color: '#0b4ca3', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.5px' }}>
            <Sparkles size={14} /> DEDICATED TO ODISHA GOVERNMENT ASPIRANTS
          </div>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'Poppins, sans-serif', lineHeight: 1.3 }}>
            About Odisha Aspirants
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
            Empowering job seekers across all 30 districts of Odisha with authentic exam intelligence, free learning handbooks, and computerized mock testing.
          </p>
        </header>

        {/* Mission Statement Hero Box */}
        <section aria-label="Our Mission" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <Compass style={{ width: '28px', height: '28px', color: '#0b4ca3', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'Poppins, sans-serif' }}>
                Our Core Mission
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#334155', margin: 0, lineHeight: 1.7 }}>
                Navigating government job recruitments in Odisha has historically been challenging due to scattered notifications, confusing advertisements, and lack of affordable Computer-Based Test (CBT) practice. <strong>Odisha Aspirants</strong> was founded with a single, unwavering mission: <strong>to democratize exam preparation by offering 100% free, clutter-free, and verified exam updates alongside an authentic CBT testing engine.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Core Pillars Grid */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 18px 0', fontFamily: 'Poppins, sans-serif' }}>
            What We Deliver to Aspirants
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {corePillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: pillar.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                    <IconComp size={22} style={{ color: pillar.color }} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins, sans-serif' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our 4-Step Verification Workflow (Essential for AdSense & E-E-A-T) */}
        <section style={{ marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
            <Award size={16} /> EDITORIAL EXCELLENCE &amp; INTEGRITY
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 18px 0', fontFamily: 'Poppins, sans-serif' }}>
            Our Rigorous Fact-Checking Workflow
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px' }}>
            {verificationSteps.map((step, idx) => (
              <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0b4ca3', fontFamily: 'Poppins, sans-serif', marginBottom: '4px' }}>
                  {step.step}
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recruitment Boards Covered */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0', fontFamily: 'Poppins, sans-serif' }}>
            Key Recruitment Boards We Cover
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#475569', margin: '0 0 14px 0' }}>
            We monitor all primary state and central recruitment agencies operating within Odisha:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              'OSSC (Combined Graduate Level, ATO, CHSL)',
              'OSSSC (RI, ARI, Amin, ICDS Supervisor, Nursing Officer)',
              'OPSC (Odisha Civil Services, Medical Officer, PGT, ASCO)',
              'Odisha Police State Board (Constable, Sub-Inspector)',
              'High Court of Orissa (ASO, Stenographer)',
              'WCD Odisha (Anganwadi, Social Welfare)',
              'Railway Recruitment Board (RRB East Coast Railway)',
            ].map((board, idx) => (
              <span key={idx} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>
                ✓ {board}
              </span>
            ))}
          </div>
        </section>

        {/* Community Trust Statistics */}
        <section style={{ background: 'linear-gradient(135deg, #0b4ca3 0%, #083b7f 100%)', color: '#ffffff', borderRadius: '16px', padding: '24px 20px', marginBottom: '36px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 16px 0', fontFamily: 'Poppins, sans-serif' }}>
            Trusted by Thousands of Candidates Across Odisha
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ff7a00', fontFamily: 'Poppins, sans-serif' }}>150K+</div>
              <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>Monthly Aspirants</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'Poppins, sans-serif' }}>500+</div>
              <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>Notifications Tracked</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4ade80', fontFamily: 'Poppins, sans-serif' }}>100%</div>
              <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>Free Access</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#facc15', fontFamily: 'Poppins, sans-serif' }}>30</div>
              <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>Districts Covered</div>
            </div>
          </div>
        </section>

        {/* Contact CTA Block */}
        <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
            Have a Question or Suggestion?
          </h2>
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', lineHeight: 1.6 }}>
            Our editorial team welcomes constructive feedback, exam paper submissions, and content corrections. Connect with us anytime at <a href="mailto:support@odishaaspirants.com" style={{ color: '#0b4ca3', fontWeight: 600 }}>support@odishaaspirants.com</a> or via our dedicated contact page.
          </p>
          <div style={{ marginTop: '8px' }}>
            <Link
              href="/contact-us"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#0b4ca3',
                color: '#ffffff',
                padding: '10px 18px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.88rem',
              }}
            >
              Contact Editorial Team <ArrowRight size={15} />
            </Link>
          </div>
        </section>

      </article>
    </div>
  );
}
