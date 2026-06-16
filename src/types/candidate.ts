export type Verdict = 'ПОДХОДИТ' | 'ЧАСТИЧНО' | 'НЕ СООТВЕТСТВУЕТ'

export type VerdictClass = 'verdict-green' | 'verdict-orange' | 'verdict-red'

export type CriteriaStatus = 'ok' | 'partial' | 'no'

export type CriteriaItem = [CriteriaStatus, string]

export type ExperienceItem = [period: string, company: string, role: string, duration: string]

/** Codes as stored in the mock API; see STATUS_LABELS in utils/helpers.ts for the Russian display labels. */
export type CandidateStatus = 'new' | 'review' | 'invited' | 'rejected'

export const CANDIDATE_STATUSES: readonly CandidateStatus[] = ['new', 'review', 'invited', 'rejected']

export const VERDICT_FILTERS: readonly Verdict[] = ['ПОДХОДИТ', 'ЧАСТИЧНО', 'НЕ СООТВЕТСТВУЕТ']

export interface Candidate {
  id: string
  name: string
  position: string
  pos_label: string
  file?: string
  email: string
  phone: string | null
  city: string | null
  tg: string
  exp: ExperienceItem[]
  total_exp: string
  stack: string
  edu: string
  verdict: Verdict
  vc: VerdictClass
  criteria: CriteriaItem[]
  summary: string
  questions: string[]
  status: CandidateStatus
  createdAt: string
}

export type SortField = 'name' | 'experience' | 'createdAt'

export type SortDirection = 'asc' | 'desc'

export interface CandidateFilters {
  verdict: Verdict | 'all'
  search: string
  sortField: SortField
  sortDirection: SortDirection
  page: number
}
