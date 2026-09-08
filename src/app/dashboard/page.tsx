'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Question } from '@/lib/data';
import {
  Clock,
  Award,
  BarChart2,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Sparkles,
  ShieldCheck,
  LogOut,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
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

const AVAILABLE_TESTS = [
  {
    id: 1,
    title: 'OSSSC Combined Recruitment Exam IV (CRE IV) Official Full Mock Test',
    board: 'OSSSC',
    duration: '120 Minutes',
    totalMarks: '100 Marks',
    negative: '-0.25 Deduction',
    sections: 'General Awareness, Arithmetic, Reasoning & Computer, Odia & English',
    isLive: true,
  },
  {
    id: 2,
    title: 'OSSC Combined Graduate Level (CGL) Prelims Mock Test 2026',
    board: 'OSSC',
    duration: '150 Minutes',
    totalMarks: '150 Marks',
    negative: '-0.25 Deduction',
    sections: 'General Studies, Current Events, Reasoning, Computer Awareness',
    isLive: true,
  },
  {
    id: 3,
    title: 'OPSC Odisha Civil Services (OAS) Paper I Mock Test 2026',
    board: 'OPSC',
    duration: '120 Minutes',
    totalMarks: '200 Marks',
    negative: '-0.33 Deduction',
    sections: 'Odisha History, Geography, Indian Polity, Economy & Science',
    isLive: true,
  },
];

export default function CandidateDashboardPage() {
  const router = useRouter();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // CBT Exam State
  const [isExamActive, setIsExamActive] = useState(false);
  const [activeExamTitle, setActiveExamTitle] = useState(DEFAULT_EXAM.title);
  const exam = DEFAULT_EXAM;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([1]);
  const [timeLeft, setTimeLeft] = useState(exam.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSection, setSelectedSection] = useState(exam.sections[0]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Authentication Guard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('oa_mock_candidate');
        if (!saved) {
          router.replace('/mock-test');
          return;
        }
        setCandidate(JSON.parse(saved));
      } catch {
        router.replace('/mock-test');
        return;
      }
      setIsCheckingAuth(false);
    }
  }, [router]);

  // Timer Countdown Effect
  useEffect(() => {
    if (!isExamActive || isSubmitted || timeLeft <= 0) return;
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
  }, [isExamActive, isSubmitted, timeLeft]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('oa_mock_candidate');
    } catch {}
    router.push('/mock-test');
  };

  const handleStartExam = (testTitle: string) => {
    setActiveExamTitle(testTitle);
    setIsExamActive(true);
    setIsSubmitted(false);
    setUserAnswers({});
    setMarkedForReview([]);
    setVisitedQuestions([1]);
    setTimeLeft(exam.timeLimitMinutes * 60);
    setCurrentIndex(0);
  };

  // Current Question
  const currentQ: Question = exam.questions[currentIndex];

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

  if (isCheckingAuth || !candidate) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Poppins, sans-serif' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid #0b4ca3', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 18px auto' }}></div>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Loading Candidate Dashboard...</p>
      </div>
    );
  }

  // 1. CBT EXAM SCREEN (WHEN ACTIVE)
  if (isExamActive) {
    return (
      <div style={{ maxWidth: '1360px', margin: '20px auto', padding: '0 clamp(0.75rem, 2.5vw, 1.5rem)' }}>
        {/* Top CBT Header */}
        <div className="cbt-top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles style={{ width: '24px', height: '24px', color: '#ff7a00', flexShrink: 0 }} />
            <div>
              <h1 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: 800, margin: 0, fontFamily: 'Poppins' }}>{activeExamTitle}</h1>
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
              onClick={() => setIsExamActive(false)}
              title="Return to Dashboard"
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', marginLeft: '6px', display: 'flex', alignItems: 'center' }}
            >
              <ArrowLeft style={{ width: '16px', height: '16px' }} />
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

        {/* If Submitted: Show Scorecard */}
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
                <strong style={{ fontSize: '0.95rem', color: '#334155' }}>{activeExamTitle}</strong>
              </div>
              <button
                onClick={() => setIsExamActive(false)}
                style={{ background: '#0b4ca3', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft size={14} /> Back to Dashboard
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
                onClick={() => handleStartExam(activeExamTitle)}
                style={{ background: '#0b4ca3', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <RefreshCw style={{ width: '18px', height: '18px' }} /> Re-take Practice Test
              </button>

              <button
                onClick={() => setIsExamActive(false)}
                style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <ArrowLeft style={{ width: '18px', height: '18px' }} /> Return to Dashboard
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

  // 2. CANDIDATE DASHBOARD HOME SCREEN (WHEN EXAM IS NOT ACTIVE)
  return (
    <div style={{ maxWidth: '1200px', margin: '25px auto 60px auto', padding: '0 clamp(0.75rem, 2.5vw, 1.5rem)', fontFamily: 'Poppins, sans-serif' }}>
      {/* Dashboard Top Header Bar */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b4ca3', letterSpacing: '-0.3px' }}>
              Odisha Aspirants
            </span>
          </Link>
          <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '99px' }}>
            CANDIDATE DASHBOARD
          </span>
        </div>

        {/* Candidate Profile Details & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#0b4ca3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', boxShadow: '0 2px 8px rgba(11, 76, 163, 0.25)' }}>
              {candidate.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                {candidate.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Roll: <strong style={{ color: '#0b4ca3', fontFamily: 'monospace' }}>{candidate.rollNo}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '8px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s ease' }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Welcome Candidate Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0b2246 0%, #0f172a 100%)', color: 'white', borderRadius: '20px', padding: 'clamp(1.5rem, 3.5vw, 2.5rem)', marginBottom: '30px', boxShadow: '0 12px 32px rgba(11, 34, 70, 0.15)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '750px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.12)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', marginBottom: '14px' }}>
            <Sparkles size={14} style={{ color: '#ff7a00' }} />
            Official Mock Test Portal 2026
          </div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, margin: '0 0 10px 0', lineHeight: 1.25 }}>
            Welcome to Your Mock Test Dashboard, {candidate.name}!
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 20px 0' }}>
            Attempt real-time CBT mock tests designed specifically on latest OSSSC, OSSC, and OPSC examination schemes. Track your accuracy, time management, and detailed question solutions.
          </p>
          <button
            onClick={() => handleStartExam(DEFAULT_EXAM.title)}
            style={{ background: '#ff7a00', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(255, 122, 0, 0.4)' }}
          >
            <PlayCircle size={18} /> Start OSSSC CRE IV Mock Test Now &rarr;
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '35px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={18} />
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>AVAILABLE TESTS</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>3 Official CBTs</div>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Active & Ready to Attempt</span>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={18} />
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>NEGATIVE MARKING</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>-0.25 to -0.33</div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Automated Penalty Deduction</span>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>TEST DURATION</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>120 Minutes</div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Live Countdown Timer Sync</span>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#faf5ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} />
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>EXAM ENVIRONMENT</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>TCS iON CBT</div>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>100% Verified Real Scheme</span>
        </div>
      </div>

      {/* Available CBT Mock Tests Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
              Available Computer Based Tests (CBT)
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
              Select an official examination test to practice right now.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {AVAILABLE_TESTS.map((t) => (
            <div
              key={t.id}
              style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', transition: 'transform 0.15s ease, box-shadow 0.15s ease', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ background: '#0b4ca3', color: 'white', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>
                    {t.board}
                  </span>
                  <span style={{ background: '#ecfdf5', color: '#059669', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                    LIVE MOCK TEST
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
                    • {t.duration} • {t.totalMarks}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                  {t.title}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.82rem', margin: 0 }}>
                  <strong>Sections:</strong> {t.sections}
                </p>
              </div>

              <button
                onClick={() => handleStartExam(t.title)}
                style={{ background: '#0b4ca3', color: 'white', border: 'none', padding: '12px 22px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background 0.15s ease', flexShrink: 0 }}
              >
                <PlayCircle size={16} /> Start Test <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CBT Examination Guidelines Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '22px 24px' }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} style={{ color: '#0b4ca3' }} /> Important CBT Examination Guidelines
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} />
            <span><strong>Timer Countdown:</strong> Test automatically calculates remaining time. If timer runs out, answers are auto-submitted safely.</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} />
            <span><strong>Question Palette:</strong> Green means Answered, Red means Not Answered, and Purple indicates Marked for Review.</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} />
            <span><strong>Instant Scorecard:</strong> Upon submitting, accuracy %, total marks scored, and complete question solutions are revealed.</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} />
            <span><strong>Unlimited Practice:</strong> You can re-take tests as many times as you like with zero application fees.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
