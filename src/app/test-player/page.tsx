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
} from 'lucide-react';

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

export default function TestPlayerPage() {
  const exam = DEFAULT_EXAM;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([1]);
  const [timeLeft, setTimeLeft] = useState(exam.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSection, setSelectedSection] = useState(exam.sections[0]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Timer Countdown Effect
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
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
  }, [isSubmitted, timeLeft]);

  // Current Question
  const currentQ: Question = exam.questions[currentIndex];

  // Section Filtered Questions
  const sectionQuestions = exam.questions.filter((q) => q.section === selectedSection);

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

  return (
    <div style={{ maxWidth: '1360px', margin: '20px auto', padding: '0 clamp(0.75rem, 2.5vw, 1.5rem)' }}>
      {/* Top CBT Header */}
      <div className="cbt-top-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles style={{ width: '24px', height: '24px', color: '#ff7a00', flexShrink: 0 }} />
          <div>
            <h1 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: 800, margin: 0, fontFamily: 'Poppins' }}>{exam.title}</h1>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Odisha Sub-Ordinate Staff Selection Commission CBT Portal</span>
          </div>
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
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}>
              <Award style={{ width: '36px', height: '36px' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Poppins' }}>
              Mock Test Completed Successfully!
            </h2>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Here is your performance analytics report and detailed answer key review.</p>
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
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>-0.33 Deduction</div>
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

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
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
                  Marks: +{exam.marksCorrect} | -{exam.marksIncorrect}
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
