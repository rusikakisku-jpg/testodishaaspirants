import { JobItem, PYQItem, NoteItem, SyllabusItem } from './data';

const API_BASE = 'https://api.odishaaspirants.com/api';

const getFetchOptions = (): RequestInit => {
  if (typeof window === 'undefined') {
    return {};
  }
  return { cache: 'no-cache' };
};

export function getJobSlug(job: { id: number; board: string; title: string; slug?: string }): string {
  if (job.slug && job.slug.trim().length > 0) return job.slug;
  const raw = `${job.board}-${job.title}`.toLowerCase();
  const clean = raw.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  return clean || `job-${job.id}`;
}

// Transform database row (snake_case) into frontend JobItem interface (camelCase)
export function transformDbJob(row: any): JobItem {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug || '',
    board: row.board,
    boardFull: row.board_full || row.board,
    vacancies: row.vacancies || '--',
    qualification: row.qualification || '--',
    lastDate: row.last_date || '--',
    publishDate: row.publish_date || '--',
    status: row.status || 'Active Now',
    statusClass: (row.status_class || 'status-active') as any,
    category: row.category as any,
    overview: row.overview || 'Overview details to be added.',
    eligibilityHtml: row.eligibility_html || '<p>Please refer to eligibility details.</p>',
    datesHtml: row.dates_html || '<p>Important dates details.</p>',
    feeHtml: row.fee_html || '<p>Application fee details.</p>',
    syllabusHtml: row.syllabus_html || '<p>Syllabus details.</p>',
    applyHtml: row.apply_html || '<p>How to apply guidelines.</p>',
    ctaText: row.cta_text || 'Apply Online',
    ctaUrl: row.cta_url || '#',
    notificationUrl: row.notification_url || '#',
  };
}

// Fetch all jobs or filter by category from Cloudflare Workers API + D1 Database
export async function fetchJobsApi(category?: string): Promise<JobItem[]> {
  try {
    const url = category ? `${API_BASE}/jobs?category=${category}` : `${API_BASE}/jobs`;
    const res = await fetch(url, getFetchOptions());
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data.map(transformDbJob);
    }
  } catch (err) {
    console.error('Error fetching jobs from Cloudflare D1 API:', err);
  }
  return [];
}

// Fetch single job details by ID or Slug
export async function fetchJobDetailsApi(idOrSlug: string): Promise<JobItem | null> {
  try {
    const res = await fetch(`${API_BASE}/jobs/${idOrSlug}`, getFetchOptions());
    const json = await res.json();
    if (json.success && json.data) {
      return transformDbJob(json.data);
    }
  } catch (err) {
    console.error(`Error fetching job details for ${idOrSlug} from Cloudflare D1 API:`, err);
  }
  return null;
}

// Fetch Syllabus Patterns & Subjects from Cloudflare D1 Database
export async function fetchSyllabusApi(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/syllabus`, getFetchOptions());
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
  } catch (err) {
    console.error('Error fetching syllabus from Cloudflare D1 API:', err);
  }
  return [];
}

// Fetch PYQ Papers from Cloudflare D1 Database
export async function fetchPyqsApi(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/pyq`, getFetchOptions());
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
  } catch (err) {
    console.error('Error fetching PYQs from Cloudflare D1 API:', err);
  }
  return [];
}

// Fetch Study Notes from Cloudflare D1 Database
export async function fetchNotesApi(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/notes`, getFetchOptions());
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
  } catch (err) {
    console.error('Error fetching Study Notes from Cloudflare D1 API:', err);
  }
  return [];
}
