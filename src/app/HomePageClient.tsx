'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JobItem } from '@/lib/data';
import { fetchJobsApi, fetchPyqsApi, fetchSyllabusApi, getJobSlug } from '@/lib/api';
import {
  Briefcase,
  IdCard,
  Key,
  Star,
  Book,
  FileText,
} from 'lucide-react';

interface HomePageClientProps {
  initialVacancies: JobItem[];
  initialAdmitCards: JobItem[];
  initialAnswerKeys: JobItem[];
  initialResults: JobItem[];
  initialPyqs: any[];
  initialSyllabusList: any[];
}

export default function HomePageClient({
  initialVacancies,
  initialAdmitCards,
  initialAnswerKeys,
  initialResults,
  initialPyqs,
  initialSyllabusList,
}: HomePageClientProps) {
  const [vacancies, setVacancies] = useState<JobItem[]>(initialVacancies);
  const [admitCards, setAdmitCards] = useState<JobItem[]>(initialAdmitCards);
  const [answerKeys, setAnswerKeys] = useState<JobItem[]>(initialAnswerKeys);
  const [results, setResults] = useState<JobItem[]>(initialResults);
  const [pyqs, setPyqs] = useState<any[]>(initialPyqs);
  const [syllabusList, setSyllabusList] = useState<any[]>(initialSyllabusList);

  useEffect(() => {
    async function refreshAllHomeData() {
      try {
        const [allJobs, pyqData, sylData] = await Promise.all([
          fetchJobsApi(),
          fetchPyqsApi(),
          fetchSyllabusApi(),
        ]);

        if (allJobs.length > 0) {
          setVacancies(allJobs.filter((j) => j.category === 'vacancy').slice(0, 10));
          setAdmitCards(allJobs.filter((j) => j.category === 'admit').slice(0, 10));
          setAnswerKeys(allJobs.filter((j) => j.category === 'key').slice(0, 10));
          setResults(allJobs.filter((j) => j.category === 'result').slice(0, 10));
        }
        if (pyqData.length > 0) setPyqs(pyqData.slice(0, 10));
        if (sylData.length > 0) setSyllabusList(sylData.slice(0, 10));
      } catch (e) {
        // Silent error
      }
    }
    refreshAllHomeData();
  }, []);

  return (
    <>

      {/* 6-Card Grid Section matching odishaaspirants.com */}
      <section className="cards-matrix-section">
        <div className="cards-grid">
          {/* Card 1: Latest Jobs */}
          <div className="category-card">
            <div className="card-header" style={{ background: '#0b4ca3' }}>
              <div className="card-header-left">
                <Briefcase style={{ width: '20px', height: '20px' }} />
                <h2 className="card-header-title">Latest Jobs</h2>
              </div>
            </div>
            <ul className="card-list">
              {vacancies.length > 0 ? (
                vacancies.map((item) => (
                  <li key={item.id}>
                    <Link href={`/articles/${getJobSlug(item)}`} className="card-list-item">
                      <span className="item-bullet"></span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No active vacancies found.</li>
              )}
            </ul>
            <Link href="/latest-jobs" className="card-footer-btn">
              View All Latest Jobs &rarr;
            </Link>
          </div>

          {/* Card 2: Admit Card */}
          <div className="category-card">
            <div className="card-header" style={{ background: '#0284c7' }}>
              <div className="card-header-left">
                <IdCard style={{ width: '20px', height: '20px' }} />
                <h2 className="card-header-title">Admit Card</h2>
              </div>
            </div>
            <ul className="card-list">
              {admitCards.length > 0 ? (
                admitCards.map((item) => (
                  <li key={item.id}>
                    <Link href={`/articles/${getJobSlug(item)}`} className="card-list-item">
                      <span className="item-bullet"></span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No admit cards available.</li>
              )}
            </ul>
            <Link href="/admit-card" className="card-footer-btn">
              View All Admit Cards &rarr;
            </Link>
          </div>

          {/* Card 3: Answer Key */}
          <div className="category-card">
            <div className="card-header" style={{ background: '#059669' }}>
              <div className="card-header-left">
                <Key style={{ width: '20px', height: '20px' }} />
                <h2 className="card-header-title">Answer Key</h2>
              </div>
            </div>
            <ul className="card-list">
              {answerKeys.length > 0 ? (
                answerKeys.map((item) => (
                  <li key={item.id}>
                    <Link href={`/articles/${getJobSlug(item)}`} className="card-list-item">
                      <span className="item-bullet"></span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No answer keys available.</li>
              )}
            </ul>
            <Link href="/answer-key" className="card-footer-btn">
              View All Answer Keys &rarr;
            </Link>
          </div>

          {/* Card 4: Result */}
          <div className="category-card">
            <div className="card-header" style={{ background: '#7c3aed' }}>
              <div className="card-header-left">
                <Star style={{ width: '20px', height: '20px' }} />
                <h2 className="card-header-title">Result</h2>
              </div>
            </div>
            <ul className="card-list">
              {results.length > 0 ? (
                results.map((item) => (
                  <li key={item.id}>
                    <Link href={`/articles/${getJobSlug(item)}`} className="card-list-item">
                      <span className="item-bullet"></span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No exam results available.</li>
              )}
            </ul>
            <Link href="/result" className="card-footer-btn">
              View All Results &rarr;
            </Link>
          </div>

          {/* Card 5: PYQ Papers */}
          <div className="category-card">
            <div className="card-header" style={{ background: '#ea580c' }}>
              <div className="card-header-left">
                <Book style={{ width: '20px', height: '20px' }} />
                <h2 className="card-header-title">PYQ Papers</h2>
              </div>
            </div>
            <ul className="card-list">
              {pyqs.length > 0 ? (
                pyqs.map((item) => (
                  <li key={item.id}>
                    <Link href="/pyq" className="card-list-item">
                      <span className="item-bullet"></span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No question papers available.</li>
              )}
            </ul>
            <Link href="/pyq" className="card-footer-btn">
              View All PYQ Papers &rarr;
            </Link>
          </div>

          {/* Card 6: Exam Syllabus */}
          <div className="category-card">
            <div className="card-header" style={{ background: '#475569' }}>
              <div className="card-header-left">
                <FileText style={{ width: '20px', height: '20px' }} />
                <h2 className="card-header-title">Exam Syllabus</h2>
              </div>
            </div>
            <ul className="card-list">
              {syllabusList.length > 0 ? (
                syllabusList.map((item) => (
                  <li key={item.id}>
                    <Link href={`/articles/${getJobSlug(item)}`} className="card-list-item">
                      <span className="item-bullet"></span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No syllabus guides available.</li>
              )}
            </ul>
            <Link href="/syllabus" className="card-footer-btn">
              View All Exam Syllabus &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
