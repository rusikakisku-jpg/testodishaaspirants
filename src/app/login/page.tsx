'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  LogIn,
  UserPlus,
  GraduationCap,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Form Fields
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [regName, setRegName] = useState('');
  const [regContact, setRegContact] = useState('');
  const [regExam, setRegExam] = useState('OSSSC Combined Recruitment Exam IV (CRE IV)');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');
    if (!loginId.trim()) {
      setLoginError('Please enter Roll Number, Registration No, or Email.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter your Password or DOB PIN.');
      return;
    }

    const trimmed = loginId.trim();
    const isEmail = trimmed.includes('@');
    const autoRoll = trimmed.toUpperCase().startsWith('OA-')
      ? trimmed.toUpperCase()
      : `OA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCandidate = {
      name: isEmail ? trimmed.split('@')[0] : `Candidate ${trimmed}`,
      rollNo: autoRoll,
      email: isEmail ? trimmed : undefined,
      targetExam: 'OSSSC Combined Recruitment Exam IV (CRE IV)',
      isGuest: false,
    };

    try {
      localStorage.setItem('oa_mock_candidate', JSON.stringify(newCandidate));
    } catch {}
    router.push('/mock-test');
  };

  const handleSignUp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setRegError('');
    if (!regName.trim()) {
      setRegError('Please enter candidate full name.');
      return;
    }
    if (!regContact.trim()) {
      setRegError('Please enter email or mobile number.');
      return;
    }
    if (!regPassword.trim() || regPassword.length < 4) {
      setRegError('Please create a password of at least 4 characters.');
      return;
    }

    const generatedRoll = `OA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCandidate = {
      name: regName.trim(),
      rollNo: generatedRoll,
      email: regContact.trim(),
      targetExam: regExam,
      isGuest: false,
    };

    try {
      localStorage.setItem('oa_mock_candidate', JSON.stringify(newCandidate));
    } catch {}
    router.push('/mock-test');
  };

  const handleQuickDemoLogin = () => {
    const demoCandidate = {
      name: 'Demo Candidate',
      rollNo: 'OA-2026-DEMO',
      email: 'demo.candidate@odishaaspirants.com',
      targetExam: 'OSSSC CRE IV Full Mock Test',
      isGuest: false,
    };
    try {
      localStorage.setItem('oa_mock_candidate', JSON.stringify(demoCandidate));
    } catch {}
    router.push('/mock-test');
  };

  const handleGuestLogin = () => {
    const guestCandidate = {
      name: 'Guest Aspirant',
      rollNo: 'OA-GUEST-TEST',
      targetExam: 'General Practice Exam',
      isGuest: true,
    };
    try {
      localStorage.setItem('oa_mock_candidate', JSON.stringify(guestCandidate));
    } catch {}
    router.push('/mock-test');
  };

  return (
    <div className="cbt-auth-viewport">
      {/* Top Header Bar */}
      <div className="cbt-auth-topbar">
        <div className="cbt-auth-brand">
          <span className="cbt-auth-brand-logo">Odisha Aspirants</span>
          <span className="cbt-auth-badge">PORTAL LOGIN</span>
        </div>
        <Link href="/" className="cbt-auth-return-btn">
          <ArrowLeft size={14} /> Return to Home
        </Link>
      </div>

      {/* Center Main Login Card */}
      <div className="cbt-auth-main">
        <div className="cbt-auth-card animate-fade-in">
          <div className="cbt-auth-header">
            <div className="cbt-auth-icon">
              <ShieldCheck size={22} />
            </div>
            <h1 className="cbt-auth-title">Candidate Login</h1>
            <p className="cbt-auth-subtitle">
              Sign in to access Mock Tests & Examination Features
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="cbt-auth-tabs">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setLoginError('');
                setRegError('');
              }}
              className={`cbt-auth-tab ${authMode === 'signin' ? 'active' : ''}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setLoginError('');
                setRegError('');
              }}
              className={`cbt-auth-tab ${authMode === 'signup' ? 'active' : ''}`}
            >
              New Registration
            </button>
          </div>

          {/* Sign In Tab */}
          {authMode === 'signin' ? (
            <form onSubmit={handleSignIn}>
              {loginError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', marginBottom: '10px', fontWeight: 600 }}>
                  {loginError}
                </div>
              )}

              <div className="cbt-auth-field">
                <label className="cbt-auth-label">Roll No / Registration No / Email</label>
                <div className="cbt-auth-input-wrap">
                  <User className="cbt-auth-input-icon" />
                  <input
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="e.g. OA-2026-8942 or email"
                    className="cbt-auth-input"
                  />
                </div>
              </div>

              <div className="cbt-auth-field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label className="cbt-auth-label" style={{ marginBottom: 0 }}>Password / PIN</label>
                  <span
                    onClick={() => alert('For practice tests, enter any password (e.g. 1234) or use the 1-Click Quick Demo Login below.')}
                    style={{ fontSize: '0.72rem', color: '#0b4ca3', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Need Help?
                  </span>
                </div>
                <div className="cbt-auth-input-wrap">
                  <Lock className="cbt-auth-input-icon" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password or DDMMYYYY"
                    className="cbt-auth-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="cbt-auth-toggle"
                    aria-label="Toggle password visibility"
                  >
                    {showLoginPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="cbt-auth-btn">
                <LogIn size={16} /> Sign In & Enter Portal <ChevronRight size={14} />
              </button>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="cbt-auth-demo-btn"
              >
                <Sparkles size={14} style={{ color: '#2563eb' }} />
                ⚡ Quick Demo Login (1-Click Instant Access)
              </button>
            </form>
          ) : (
            /* Sign Up Tab */
            <form onSubmit={handleSignUp}>
              {regError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', marginBottom: '10px', fontWeight: 600 }}>
                  {regError}
                </div>
              )}

              <div className="cbt-auth-field">
                <label className="cbt-auth-label">Candidate Full Name</label>
                <div className="cbt-auth-input-wrap">
                  <User className="cbt-auth-input-icon" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Full Name"
                    className="cbt-auth-input"
                  />
                </div>
              </div>

              <div className="cbt-auth-field">
                <label className="cbt-auth-label">Email / Mobile Number</label>
                <div className="cbt-auth-input-wrap">
                  <Mail className="cbt-auth-input-icon" />
                  <input
                    type="text"
                    value={regContact}
                    onChange={(e) => setRegContact(e.target.value)}
                    placeholder="Email or Mobile"
                    className="cbt-auth-input"
                  />
                </div>
              </div>

              <div className="cbt-auth-field">
                <label className="cbt-auth-label">Target Examination</label>
                <div className="cbt-auth-input-wrap">
                  <GraduationCap className="cbt-auth-input-icon" />
                  <select
                    value={regExam}
                    onChange={(e) => setRegExam(e.target.value)}
                    className="cbt-auth-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="OSSSC Combined Recruitment Exam IV (CRE IV)">OSSSC Combined Recruitment Exam IV (CRE IV)</option>
                    <option value="OSSC Combined Graduate Level (CGL)">OSSC Combined Graduate Level (CGL)</option>
                    <option value="OPSC Odisha Civil Services (OAS)">OPSC Odisha Civil Services (OAS)</option>
                    <option value="Odisha Police SI & Constable">Odisha Police SI & Constable</option>
                    <option value="Railway RRB NTPC & Group D">Railway RRB NTPC & Group D</option>
                    <option value="Other Odisha State Recruitments">Other Odisha State Recruitments</option>
                  </select>
                </div>
              </div>

              <div className="cbt-auth-field">
                <label className="cbt-auth-label">Password</label>
                <div className="cbt-auth-input-wrap">
                  <Lock className="cbt-auth-input-icon" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create password"
                    className="cbt-auth-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="cbt-auth-toggle"
                    aria-label="Toggle password visibility"
                  >
                    {showRegPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="cbt-auth-btn">
                <UserPlus size={16} /> Register & Enter Portal <ChevronRight size={14} />
              </button>
            </form>
          )}

          {/* Guest Practice Link */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="cbt-auth-guest-btn"
          >
            Practice as Guest Aspirant without Sign In &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
