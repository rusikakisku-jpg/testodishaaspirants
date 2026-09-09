'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  Sparkles,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
} from 'lucide-react';

interface Candidate {
  name: string;
  rollNo: string;
  email?: string;
  targetExam?: string;
  isGuest?: boolean;
}

export default function MockTestLoginPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Login Form Fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Sign Up Form Fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');

  // Auto-redirect if already logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('oa_mock_candidate');
        if (saved) {
          router.replace('/dashboard');
          return;
        }
      } catch {
        // ignore
      }
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim()) {
      setLoginError('Please enter your Email ID.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter your Password.');
      return;
    }

    const trimmed = loginEmail.trim();
    const displayName = trimmed.includes('@') ? trimmed.split('@')[0] : trimmed;
    const autoRoll = `OA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCandidate: Candidate = {
      name: displayName,
      rollNo: autoRoll,
      email: trimmed,
      targetExam: 'OSSSC Combined Recruitment Exam IV (CRE IV)',
      isGuest: false,
    };

    try {
      localStorage.setItem('oa_mock_candidate', JSON.stringify(newCandidate));
    } catch {}
    router.push('/dashboard');
  };

  const handleSignUp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setRegError('');
    if (!regName.trim()) {
      setRegError('Please enter your name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please enter your Email ID.');
      return;
    }
    if (!regPassword.trim() || regPassword.length < 4) {
      setRegError('Please enter a password with at least 4 characters.');
      return;
    }

    const generatedRoll = `OA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCandidate: Candidate = {
      name: regName.trim(),
      rollNo: generatedRoll,
      email: regEmail.trim(),
      targetExam: 'OSSSC Combined Recruitment Exam IV (CRE IV)',
      isGuest: false,
    };

    try {
      localStorage.setItem('oa_mock_candidate', JSON.stringify(newCandidate));
    } catch {}
    router.push('/dashboard');
  };

  const handleQuickDemoLogin = () => {
    const demoCandidate: Candidate = {
      name: 'Demo Candidate',
      rollNo: 'OA-2026-DEMO',
      email: 'demo.candidate@odishaaspirants.com',
      targetExam: 'OSSSC CRE IV Full Mock Test',
      isGuest: false,
    };
    try {
      localStorage.setItem('oa_mock_candidate', JSON.stringify(demoCandidate));
    } catch {}
    router.push('/dashboard');
  };

  const handleGuestLogin = () => {
    const guestCandidate: Candidate = {
      name: 'Guest Aspirant',
      rollNo: 'OA-GUEST-TEST',
      targetExam: 'General Practice Exam',
      isGuest: true,
    };
    try {
      localStorage.setItem('oa_mock_candidate', JSON.stringify(guestCandidate));
    } catch {}
    router.push('/dashboard');
  };

  if (isCheckingAuth) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Poppins, sans-serif' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid #0b4ca3', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 18px auto' }}></div>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Loading Candidate Examination Portal...</p>
      </div>
    );
  }

  return (
    <div className="cbt-auth-viewport">
      <div className="cbt-auth-main">
        <div className="cbt-auth-card animate-fade-in">
          <div className="cbt-auth-header">
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <img
                src="https://upload.odishaaspirants.com/oalogo.png"
                alt="Odisha Aspirants Logo"
                width={36}
                height={36}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/oalogo.png';
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  objectFit: 'contain',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b4ca3', fontFamily: 'Poppins', letterSpacing: '-0.3px', marginBottom: '4px' }}>
                Odisha Aspirants
              </div>
            </Link>
            <h1 className="cbt-auth-title">
              {authMode === 'signin' ? 'Candidate Login' : 'Candidate Registration'}
            </h1>
            <p className="cbt-auth-subtitle">
              Computer Based Mock Test
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

          {/* Sign In Form (Email ID & Password) */}
          {authMode === 'signin' ? (
            <form onSubmit={handleSignIn}>
              {loginError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', marginBottom: '10px', fontWeight: 600 }}>
                  {loginError}
                </div>
              )}

              <div className="cbt-auth-field">
                <label className="cbt-auth-label">Email ID</label>
                <div className="cbt-auth-input-wrap">
                  <Mail className="cbt-auth-input-icon" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    className="cbt-auth-input"
                  />
                </div>
              </div>

              <div className="cbt-auth-field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label className="cbt-auth-label" style={{ marginBottom: 0 }}>Password</label>
                  <span
                    onClick={() => alert('For practice tests, enter any password or use the 1-Click Quick Demo Login below.')}
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
                    placeholder="Enter your password"
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
                <LogIn size={16} /> Sign In & Go to Dashboard <ChevronRight size={14} />
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
            /* Sign Up Form (Name, Email ID, Password) */
            <form onSubmit={handleSignUp}>
              {regError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', marginBottom: '10px', fontWeight: 600 }}>
                  {regError}
                </div>
              )}

              <div className="cbt-auth-field">
                <label className="cbt-auth-label">Name</label>
                <div className="cbt-auth-input-wrap">
                  <User className="cbt-auth-input-icon" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Enter your full name"
                    className="cbt-auth-input"
                  />
                </div>
              </div>

              <div className="cbt-auth-field">
                <label className="cbt-auth-label">Email ID</label>
                <div className="cbt-auth-input-wrap">
                  <Mail className="cbt-auth-input-icon" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Enter your email id"
                    className="cbt-auth-input"
                  />
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
                <UserPlus size={16} /> Register & Go to Dashboard <ChevronRight size={14} />
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
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <Link href="/" style={{ color: '#94a3b8', fontSize: '0.76rem', textDecoration: 'none' }}>
              ← Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
