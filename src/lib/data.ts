export interface JobItem {
  id: number;
  title: string;
  slug?: string;
  board: string;
  boardFull: string;
  vacancies: string;
  qualification: string;
  lastDate: string;
  publishDate: string;
  status: string;
  statusClass: 'status-active' | 'status-soon' | 'status-announced' | 'status-closed';
  category: 'vacancy' | 'admit' | 'key' | 'result';
  overview: string;
  eligibilityHtml: string;
  datesHtml: string;
  feeHtml: string;
  syllabusHtml: string;
  applyHtml: string;
  ctaText: string;
  ctaUrl: string;
  notificationUrl: string;
  subtitle?: string;
  author?: string;
  officialUrl?: string;
}

export interface PYQItem {
  id: number;
  title: string;
  board: string;
  year: number;
  totalQuestions: number;
  duration: string;
  pdfUrl: string;
  subject: string;
}

export interface NoteItem {
  id: number;
  title: string;
  subject: string;
  category: string;
  pages: number;
  fileSize: string;
  pdfUrl: string;
}

export interface SyllabusItem {
  id: number;
  title: string;
  board: string;
  examPattern: { section: string; questions: number; marks: number }[];
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: string;
  topics: { category: string; details: string[] }[];
}

export interface Question {
  id: number;
  section: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
}

export interface Exam {
  id: number;
  title: string;
  board: string;
  timeLimitMinutes: number;
  marksCorrect: number;
  marksIncorrect: number;
  examYear: number;
  sections: string[];
  questions: Question[];
}
