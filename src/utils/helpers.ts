import type { CandidateStatus, CriteriaStatus, Verdict } from '../types/candidate'

const VERDICT_CLASSES: Record<Verdict, string> = {
  ПОДХОДИТ: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  ЧАСТИЧНО: 'bg-amber-50 text-amber-700 border-amber-200',
  'НЕ СООТВЕТСТВУЕТ': 'bg-rose-50 text-rose-700 border-rose-200',
}

export function getVerdictClasses(verdict: Verdict): string {
  return VERDICT_CLASSES[verdict]
}

export const STATUS_LABELS: Record<CandidateStatus, string> = {
  new: 'Новый',
  review: 'На рассмотрении',
  invited: 'Приглашён',
  rejected: 'Отклонён',
}

export function getStatusLabel(status: CandidateStatus): string {
  return STATUS_LABELS[status]
}

const STATUS_CLASSES: Record<CandidateStatus, string> = {
  new: 'bg-slate-100 text-slate-700 border-slate-300',
  review: 'bg-sky-50 text-sky-700 border-sky-200',
  invited: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-rose-50 text-rose-700 border-rose-200',
}

export function getStatusClasses(status: CandidateStatus): string {
  return STATUS_CLASSES[status]
}

const CRITERIA_ICON: Record<CriteriaStatus, string> = {
  ok: '✓',
  partial: '±',
  no: '✕',
}

const CRITERIA_CLASSES: Record<CriteriaStatus, string> = {
  ok: 'bg-emerald-100 text-emerald-700',
  partial: 'bg-amber-100 text-amber-700',
  no: 'bg-rose-100 text-rose-700',
}

export function getCriteriaIcon(status: CriteriaStatus): string {
  return CRITERIA_ICON[status]
}

export function getCriteriaClasses(status: CriteriaStatus): string {
  return CRITERIA_CLASSES[status]
}

export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

const AVATAR_PALETTE = [
  'bg-blue-100 text-blue-700',
  'bg-violet-100 text-violet-700',
  'bg-teal-100 text-teal-700',
  'bg-amber-100 text-amber-700',
  'bg-pink-100 text-pink-700',
  'bg-cyan-100 text-cyan-700',
]

export function getAvatarClasses(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i)) % AVATAR_PALETTE.length
  return AVATAR_PALETTE[hash]
}
