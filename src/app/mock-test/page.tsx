'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Question } from '@/lib/data';
import {
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  Award,
  BarChart2,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Sparkles,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  LogIn,
  UserPlus,
  LogOut,
  Check,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

interface Candidate {
  name: string;
  rollNo: string;
  email?: string;
  targetExam?: string;
  isGuest?: boolean;
}

const DEFAULT_EXAM = {
  id: 1,
  title: 'OSSSC Combined Recruitment Exam IV (CRE IV) Official Full Mock Test',
  board: 'OSSSC',
  timeLimitMinutes: 120,
  marksCorrect: 1,
  marksIncorrect: -0.25,
  examYear: 2026,
  sections: ['General Awareness', 'Arithmetic', 'Reasoning & Computer', 'Odia & English Language'],
  questions: [
    {
      id: 1,
      section: 'General Awareness',
      questionText: 'The famous Kalinga War fought by Emperor Ashoka took place in which ancient year?',
      optionA: '261 BC',
      optionB: '326 BC',
      optionC: '232 BC',
      optionD: '185 BC',
      correctOption: 'A' as const,
    },
    {
      id: 2,
      section: 'General Awareness',
      questionText: 'Who was the founder of the Ganga Dynasty in Odisha who constructed the famous Sun Temple of Konark?',
      optionA: 'Anantavarman Chodaganga',
      optionB: 'Narasimhadeva I',
      optionC: 'Kapilendra Deva',
      optionD: 'Purushottama Deva',
      correctOption: 'B' as const,
    },
    {
      id: 3,
      section: 'General Awareness',
      questionText: 'Which river is known as the "Sorrow of Odisha" prior to the construction of the Hirakud Dam?',
      optionA: 'Baitarani River',
      optionB: 'Brahmani River',
      optionC: 'Mahanadi River',
      optionD: 'Rushikulya River',
      correctOption: 'C' as const,
    },
    {
      id: 4,
      section: 'Arithmetic',
      questionText: 'If a sum of money doubles itself in 8 years at simple interest, what is the rate of interest per annum?',
      optionA: '10%',
      optionB: '12.5%',
      optionC: '15%',
      optionD: '8%',
      correctOption: 'B' as const,
    },
    {
      id: 5,
      section: 'Reasoning & Computer',
      questionText: 'In MS Excel, which keyboard shortcut key is used to insert a new worksheet instantly?',
      optionA: 'Shift + F11',
      optionB: 'Ctrl + N',
      optionC: 'Alt + Shift + F1',
      optionD: 'Ctrl + F12',
      correctOption: 'A' as const,
    },
  ],
};

export default function MockTestPage() {
  const exam = DEFAULT_EXAM;

  // Authentication State
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Login Form Fields
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Sign Up Form Fields
  const [regName, setRegName] = useState('');
  const [regContact, setRegContact] = useState('');
  const [regExam, setRegExam] = useState('OSSSC Combined Recruitment Exam IV (CRE IV)');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regAgreed, setRegAgreed] = useState(true);
  const [regError, setRegError] = useState('');

  // CBT Exam State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([1]);
  const [timeLeft, setTimeLeft] = useState(exam.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSection, setSelectedSection] = useState(exam.sections[0]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Initialize candidate session from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('oa_mock_candidate');
        if (saved) {
          setCandidate(JSON.parse(saved));
        }
      } catch {
        // ignore parse error
      }
      setIsCheckingAuth(false);
    }
  }, []);

  // Timer Countdown Effect (runs only when candidate is logged in and test is ongoing)
  useEffect(() => {
    if (!candidate || isSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [candidate, isSubmitted, timeLeft]);

  // Auth Handlers
  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');
    if (!loginId.trim()) {
      setLoginError('Please enter your Registration Number, Roll Number, or Email.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter your Password or Date of Birth PIN.');
      return;
    }

    const trimmed = loginId.trim();
    const isEmail = trimmed.includes('@');
    const autoRoll = trimmed.toUpperCase().startsWith('OA-')
      ? trimmed.toUpperCase()
      : `OA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCandidate: Candidate = {
      name: isEmail ? trimmed.split('@')[0] : `Candidate ${trimmed}`,
      rollNo: autoRoll,
      email: isEmail ? trimmed : undefined,
      targetExam: 'OSSSC Combined Recruitment Exam IV (CRE IV)',
      isGuest: false,
    };

    try {
      localStorage.setItem('oa_mock_candidate', JSON.stringify(newCandidate));
    } catch {}
    setCandidate(newCandidate);
  };

  const handleSignUp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setRegError('');
    if (!regName.trim()) {
      setRegError('Please enter your full name.');
      return;
    }
    if (!regContact.trim()) {
      setRegError('Please enter your email or mobile number.');
      return;
    }
    if (!regPassword.trim() || regPassword.length < 4) {
      setRegError('Please create a password of at least 4 characters.');
      return;
    }
    if (!regAgreed) {
      setRegError('Please accept the CBT examination guidelines.');
      return;
    }

    const generatedRoll = `OA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCandidate: Candidate = {
      name: regName.trim(),
      rollNo: generatedRoll,
      email: regContact.trim(),
      targetExam: regExam,
      isGuest: false,
    };

    try {
      localStorage.setItem('oa_mock_candidate', JSON.stringify(newCandidate));
    } catch {}
    setCandidate(newCandidate);
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
    setCandidate(demoCandidate);
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
    setCandidate(guestCandidate);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('oa_mock_candidate');
    } catch {}
    setCandidate(null);
    setIsSubmitted(false);
    setUserAnswers({});
    setMarkedForReview([]);
    setVisitedQuestions([1]);
    setTimeLeft(exam.timeLimitMinutes * 60);
    setCurrentIndex(0);
    setLoginError('');
    setRegError('');
  };

  // Current Question
  const currentQ: Question = exam.questions[currentIndex];

  // Mark visited
  const handleSelectQuestion = (index: number) => {
    setCurrentIndex(index);
    const qId = exam.questions[index].id;
    if (!visitedQuestions.includes(qId)) {
      setVisitedQuestions((prev) => [...prev, qId]);
    }
  };

  const handleOptionSelect = (opt: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: opt,
    }));
  };

  const handleClearResponse = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    if (markedForReview.includes(currentQ.id)) {
      setMarkedForReview((prev) => prev.filter((id) => id !== currentQ.id));
    } else {
      setMarkedForReview((prev) => [...prev, currentQ.id]);
    }
  };

  const handleSaveAndNext = () => {
    if (currentIndex < exam.questions.length - 1) {
      handleSelectQuestion(currentIndex + 1);
    }
  };

  // Score Calculation
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  exam.questions.forEach((q) => {
    const ans = userAnswers[q.id];
    if (!ans) {
      unattemptedCount++;
    } else if (ans === q.correctOption) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const totalScore = (correctCount * exam.marksCorrect + incorrectCount * exam.marksIncorrect).toFixed(2);
  const accuracy = (correctCount + incorrectCount) > 0 ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) : 0;
  const timeTakenSeconds = exam.timeLimitMinutes * 60 - timeLeft;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Palette Status helper
  const getQuestionStatus = (qId: number) => {
    const isAns = userAnswers[qId] !== undefined;
    const isRev = markedForReview.includes(qId);
    const isVis = visitedQuestions.includes(qId);

    if (isAns && isRev) return { bg: '#8b5cf6', color: 'white', label: 'Answered & Review' };
    if (isAns) return { bg: '#10b981', color: 'white', label: 'Answered' };
    if (isRev) return { bg: '#a855f7', color: 'white', label: 'Marked for Review' };
    if (isVis) return { bg: '#ef4444', color: 'white', label: 'Not Answered' };
    return { bg: '#e2e8f0', color: '#475569', label: 'Not Visited' };
  };

  // Preloader while checking localStorage
  if (isCheckingAuth) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Poppins, sans-serif' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid #0b4ca3', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 18px auto' }}></div>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Loading Candidate Examination Portal...</p>
      </div>
    );
  }

  // 1. PROFESSIONAL CANDIDATE LOGIN / SIGN UP SCREEN
  if (!candidate) {
    return (
      <div className="mock-auth-wrapper">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0b4ca3', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} /> Return to Odisha Aspirants Home
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', background: '#eff6ff', color: '#1e40af', padding: '4px 12px', borderRadius: '99px', fontWeight: 700 }}>
            <Sparkles style={{ width: '14px', height: '14px', color: '#ff7a00' }} />
            Official CBT Mock Test Engine 2026
          </div>
        </div>

        <div className="mock-auth-grid">
          {/* Left Brand & Information Banner */}
          <div className="mock-auth-banner">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, color: '#fca5a5', marginBottom: '18px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <ShieldCheck style={{ width: '15px', height: '15px', color: '#10b981' }} />
                Verified Candidate Portal
              </div>

              <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, margin: '0 0 14px 0', lineHeight: 1.25, fontFamily: 'Poppins' }}>
                Online CBT Mock Test Portal
              </h1>

              <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: 1.6, margin: '0 0 28px 0' }}>
                Sign in or register to attempt official Computer Based Tests (CBT) for OSSSC, OSSC, and OPSC competitive recruitments with automated timer and negative marks evaluation.
              </p>

              {/* Highlight Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck style={{ width: '20px', height: '20px', color: '#38bdf8' }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem', color: '#ffffff' }}>Real TCS iON Pattern</strong>
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Exact user interface with palette, review marks, and section jumps.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <BarChart2 style={{ width: '20px', height: '20px', color: '#4ade80' }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem', color: '#ffffff' }}>Instant Performance Scorecard</strong>
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Automated accuracy percentage, negative penalty (-0.25), and time tracking.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <BookOpen style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem', color: '#ffffff' }}>Detailed Answer Key Review</strong>
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Comprehensive answer verification after test completion.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Trust Tag */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '0.8rem', color: '#94a3b8' }}>
              <span>✓ 100% Free For All Aspirants</span>
              <span>✓ Official 2026 Pattern</span>
            </div>
          </div>

          {/* Right Candidate Authentication Card */}
          <div className="mock-auth-card">
            <div>
              {/* Tab Switcher: Login vs Sign Up */}
              <div className="mock-auth-tabs">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setLoginError('');
                    setRegError('');
                  }}
                  className={`mock-auth-tab-btn ${authMode === 'signin' ? 'active' : ''}`}
                >
                  Candidate Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setLoginError('');
                    setRegError('');
                  }}
                  className={`mock-auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
                >
                  New Registration
                </button>
              </div>

              {/* Form Content */}
              {authMode === 'signin' ? (
                <form onSubmit={handleSignIn}>
                  <div style={{ marginBottom: '18px' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins' }}>
                      Candidate Login
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                      Enter your registration details or roll number to start the test.
                    </p>
                  </div>

                  {loginError && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px', fontWeight: 600 }}>
                      {loginError}
                    </div>
                  )}

                  <div className="mock-input-group">
                    <label className="mock-input-label">Roll Number / Registration No / Email</label>
                    <div className="mock-input-wrapper">
                      <User className="mock-input-icon" />
                      <input
                        type="text"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        placeholder="e.g. OA-2026-8942 or your email"
                        className="mock-input"
                      />
                    </div>
                  </div>

                  <div className="mock-input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label className="mock-input-label" style={{ marginBottom: 0 }}>Password / DOB PIN</label>
                      <span
                        onClick={() => alert('For practice tests, you can enter any password (e.g. 1234) or use the 1-Click Quick Demo Login below.')}
                        style={{ fontSize: '0.75rem', color: '#0b4ca3', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Need Help?
                      </span>
                    </div>
                    <div className="mock-input-wrapper">
                      <Lock className="mock-input-icon" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter password or DDMMYYYY"
                        className="mock-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="mock-input-toggle"
                        aria-label="Toggle password visibility"
                      >
                        {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="mock-submit-btn">
                    <LogIn size={18} /> Sign In & Start Mock Test <ChevronRight size={16} />
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 12px 0', gap: '10px' }}>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>OR INSTANT ACCESS</span>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                  </div>

                  {/* 1-Click Instant Demo Login */}
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="mock-quick-demo-btn"
                  >
                    <Sparkles size={16} style={{ color: '#2563eb' }} />
                    Quick Demo Login (1-Click Instant Test)
                  </button>
                </form>
              ) : (
                /* Sign Up Form */
                <form onSubmit={handleSignUp}>
                  <div style={{ marginBottom: '18px' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins' }}>
                      New Candidate Registration
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                      Create your candidate profile to practice and track test scores.
                    </p>
                  </div>

                  {regError && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px', fontWeight: 600 }}>
                      {regError}
                    </div>
                  )}

                  <div className="mock-input-group">
                    <label className="mock-input-label">Full Candidate Name</label>
                    <div className="mock-input-wrapper">
                      <User className="mock-input-icon" />
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Priyabrata Mohanty"
                        className="mock-input"
                      />
                    </div>
                  </div>

                  <div className="mock-input-group">
                    <label className="mock-input-label">Email Address / Mobile Number</label>
                    <div className="mock-input-wrapper">
                      <Mail className="mock-input-icon" />
                      <input
                        type="text"
                        value={regContact}
                        onChange={(e) => setRegContact(e.target.value)}
                        placeholder="e.g. aspirant@gmail.com or 9876543210"
                        className="mock-input"
                      />
                    </div>
                  </div>

                  <div className="mock-input-group">
                    <label className="mock-input-label">Target Examination</label>
                    <div className="mock-input-wrapper">
                      <GraduationCap className="mock-input-icon" />
                      <select
                        value={regExam}
                        onChange={(e) => setRegExam(e.target.value)}
                        className="mock-input"
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

                  <div className="mock-input-group">
                    <label className="mock-input-label">Create Password / PIN</label>
                    <div className="mock-input-wrapper">
                      <Lock className="mock-input-icon" />
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Minimum 4 characters"
                        className="mock-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="mock-input-toggle"
                        aria-label="Toggle password visibility"
                      >
                        {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                    <input
                      type="checkbox"
                      id="cbt-guidelines-agree"
                      checked={regAgreed}
                      onChange={(e) => setRegAgreed(e.target.checked)}
                      style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#0b4ca3' }}
                    />
                    <label htmlFor="cbt-guidelines-agree" style={{ fontSize: '0.82rem', color: '#475569', cursor: 'pointer' }}>
                      I agree to follow official CBT test rules & time limits.
                    </label>
                  </div>

                  <button type="submit" className="mock-submit-btn">
                    <UserPlus size={18} /> Register & Enter Mock Test <ChevronRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Guest Practice Link */}
            <div style={{ textAlign: 'center', marginTop: '22px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <button
                type="button"
                onClick={handleGuestLogin}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
              >
                Continue as Guest Aspirant without Sign In &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. CBT EXAM INTERFACE (WHEN LOGGED IN)
  return (
    <div style={{ maxWidth: '1360px', margin: '20px auto', padding: '0 clamp(0.75rem, 2.5vw, 1.5rem)' }}>
      {/* Top CBT Header with Candidate Info */}
      <div className="cbt-top-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles style={{ width: '24px', height: '24px', color: '#ff7a00', flexShrink: 0 }} />
          <div>
            <h1 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: 800, margin: 0, fontFamily: 'Poppins' }}>{exam.title}</h1>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Odisha Sub-Ordinate Staff Selection Commission CBT Portal</span>
          </div>
        </div>

        {/* Center Candidate Chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#0b4ca3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.82rem', border: '1.5px solid #38bdf8' }}>
            {candidate.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.2 }}>
              {candidate.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              Roll: <strong style={{ color: '#cbd5e1', fontFamily: 'monospace' }}>{candidate.rollNo}</strong>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout / Switch Candidate"
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', marginLeft: '6px', display: 'flex', alignItems: 'center' }}
          >
            <LogOut style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        {!isSubmitted && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '8px 16px', borderRadius: '99px', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'monospace' }}>
              <Clock style={{ width: '18px', height: '18px', color: '#ef4444' }} /> {formatTime(timeLeft)}
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Submit Test
            </button>
          </div>
        )}
      </div>

      {/* If Submitted: Show Detailed Scorecard & Answer Review */}
      {isSubmitted ? (
        <div className="animate-fade-in" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}>
              <Award style={{ width: '36px', height: '36px' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins' }}>
              Mock Test Completed Successfully!
            </h2>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Here is your performance analytics report and detailed answer key review.</p>
          </div>

          {/* Candidate Verification Card */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Candidate Name</span>
              <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{candidate.name}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Roll Number</span>
              <strong style={{ fontSize: '1rem', color: '#0b4ca3', fontFamily: 'monospace' }}>{candidate.rollNo}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Examination</span>
              <strong style={{ fontSize: '0.95rem', color: '#334155' }}>{candidate.targetExam || exam.title}</strong>
            </div>
            <button
              onClick={handleLogout}
              style={{ background: '#e2e8f0', color: '#334155', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <LogOut size={14} /> Switch Candidate
            </button>
          </div>

          {/* Performance Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '15px', marginBottom: '35px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>FINAL SCORE</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0b4ca3', fontFamily: 'Poppins' }}>{totalScore}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Out of 10.0 Marks</div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>ACCURACY</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', fontFamily: 'Poppins' }}>{accuracy}%</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Correct Ratio</div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>CORRECT ANSWERS</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669', fontFamily: 'Poppins' }}>{correctCount}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>+1.0 Each</div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>INCORRECT ANSWERS</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444', fontFamily: 'Poppins' }}>{incorrectCount}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>-0.25 Deduction</div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>TIME TAKEN</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'Poppins' }}>{formatTime(timeTakenSeconds)}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Minutes : Seconds</div>
            </div>
          </div>

          {/* Answer Review Section */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '20px', fontFamily: 'Poppins' }}>
            Detailed Question & Answer Review
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {exam.questions.map((q, idx) => {
              const uAns = userAnswers[q.id];
              const isCorrect = uAns === q.correctOption;
              const isUnattempted = uAns === undefined;

              return (
                <div
                  key={q.id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: isCorrect ? '5px solid #10b981' : isUnattempted ? '5px solid #94a3b8' : '5px solid #ef4444',
                    borderRadius: '12px',
                    padding: '20px',
                  }}
                >
                  <div style={{ fontSize: '0.82rem', color: '#0b4ca3', fontWeight: 800, marginBottom: '6px' }}>
                    QUESTION {idx + 1} • {q.section}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                    {q.questionText}
                  </div>

                  <div className="cbt-options-review-grid">
                    {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                      const optText = q[`option${optKey}` as keyof Question];
                      const isUserChoice = uAns === optKey;
                      const isCorrectChoice = q.correctOption === optKey;

                      let bg = 'white';
                      let color = '#334155';
                      let border = '1px solid #cbd5e1';

                      if (isCorrectChoice) {
                        bg = 'rgba(16, 185, 129, 0.15)';
                        color = '#065f46';
                        border = '1px solid #10b981';
                      } else if (isUserChoice && !isCorrect) {
                        bg = 'rgba(239, 68, 68, 0.15)';
                        color = '#991b1b';
                        border = '1px solid #ef4444';
                      }

                      return (
                        <div key={optKey} style={{ background: bg, color: color, border: border, padding: '10px 14px', borderRadius: '8px', fontWeight: 600 }}>
                          ({optKey}) {optText}
                          {isCorrectChoice && ' ✓ (Correct)'}
                          {isUserChoice && !isCorrectChoice && ' ✗ (Your Choice)'}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '30px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setUserAnswers({});
                setMarkedForReview([]);
                setVisitedQuestions([1]);
                setTimeLeft(exam.timeLimitMinutes * 60);
                setCurrentIndex(0);
              }}
              style={{ background: '#0b4ca3', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <RefreshCw style={{ width: '18px', height: '18px' }} /> Re-take Practice Test
            </button>

            <button
              onClick={handleLogout}
              style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <LogOut style={{ width: '18px', height: '18px' }} /> Change Candidate
            </button>
          </div>
        </div>
      ) : (
        /* CBT Exam Interface */
        <div className="cbt-layout-grid">
          {/* Main Question Panel */}
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: 'clamp(1rem, 2.5vw, 1.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Section Selector Tabs */}
              <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '20px', gap: '15px', overflowX: 'auto' }}>
                {exam.sections.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => {
                      setSelectedSection(sec);
                      const firstIdx = exam.questions.findIndex((q) => q.section === sec);
                      if (firstIdx !== -1) handleSelectQuestion(firstIdx);
                    }}
                    style={{
                      padding: '8px 4px',
                      background: 'none',
                      border: 'none',
                      borderBottom: selectedSection === sec ? '3px solid #ff7a00' : '3px solid transparent',
                      color: selectedSection === sec ? '#0b4ca3' : '#64748b',
                      fontWeight: selectedSection === sec ? 700 : 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      marginBottom: '-2px',
                    }}
                  >
                    {sec}
                  </button>
                ))}
              </div>

              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0b4ca3' }}>
                  Question No. {currentIndex + 1} of {exam.questions.length}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', background: '#f1f5f9', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                  Marks: +{exam.marksCorrect} | {exam.marksIncorrect}
                </span>
              </div>

              {/* Question Statement */}
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '25px', lineHeight: 1.5, fontFamily: 'Poppins' }}>
                {currentQ.questionText}
              </div>

              {/* Options Radio List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                  const optText = currentQ[`option${optKey}` as keyof Question];
                  const isSelected = userAnswers[currentQ.id] === optKey;
                  return (
                    <button
                      key={optKey}
                      onClick={() => handleOptionSelect(optKey)}
                      style={{
                        background: isSelected ? 'rgba(11, 76, 163, 0.08)' : 'white',
                        border: isSelected ? '2px solid #0b4ca3' : '1px solid #cbd5e1',
                        color: isSelected ? '#0b4ca3' : '#334155',
                        borderRadius: '12px',
                        padding: '14px 18px',
                        textAlign: 'left',
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: isSelected ? '6px solid #0b4ca3' : '2px solid #94a3b8',
                          background: 'white',
                          boxSizing: 'border-box',
                          flexShrink: 0,
                        }}
                      ></div>
                      <span>({optKey}) {optText}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleToggleReview}
                  style={{
                    background: markedForReview.includes(currentQ.id) ? '#8b5cf6' : '#f1f5f9',
                    color: markedForReview.includes(currentQ.id) ? 'white' : '#475569',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Bookmark style={{ width: '15px', height: '15px' }} />
                  {markedForReview.includes(currentQ.id) ? 'Unmark Review' : 'Mark for Review'}
                </button>

                <button
                  onClick={handleClearResponse}
                  style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Clear Response
                </button>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {currentIndex > 0 && (
                  <button
                    onClick={() => handleSelectQuestion(currentIndex - 1)}
                    style={{ background: '#334155', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <ChevronLeft style={{ width: '16px', height: '16px' }} /> Prev
                  </button>
                )}

                <button
                  onClick={handleSaveAndNext}
                  style={{ background: '#0b4ca3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  Save & Next <ChevronRight style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Question Palette Sidebar */}
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '15px', fontFamily: 'Poppins' }}>
              Question Palette
            </h3>

            {/* Question Badges Legend */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem', marginBottom: '20px', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#10b981' }}></span> Answered
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#ef4444' }}></span> Not Answered
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#8b5cf6' }}></span> Marked Review
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#e2e8f0' }}></span> Not Visited
              </div>
            </div>

            {/* Grid Palette */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', maxHeight: '360px', overflowY: 'auto' }}>
              {exam.questions.map((q, idx) => {
                const st = getQuestionStatus(q.id);
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(idx)}
                    style={{
                      background: st.bg,
                      color: st.color,
                      border: isCurrent ? '2px solid #0f172a' : 'none',
                      borderRadius: '8px',
                      height: '38px',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: isCurrent ? '0 0 0 2px #0b4ca3' : 'none',
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Confirm Submit Modal */}
      {showConfirmModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', maxWidth: '440px', width: '100%', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: 0, marginBottom: '12px', fontFamily: 'Poppins' }}>
              Submit Mock Test?
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.5 }}>
              Are you sure you want to finish and submit your test? Once submitted, your scorecard will be generated immediately.
            </p>

            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', marginBottom: '24px', fontSize: '0.85rem', color: '#334155' }}>
              <div>• Attempted: <strong>{correctCount + incorrectCount}</strong> Questions</div>
              <div>• Remaining: <strong>{unattemptedCount}</strong> Questions</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel & Continue Test
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setIsSubmitted(true);
                }}
                style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
