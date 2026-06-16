import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Candidate } from '../../types/candidate'
import { getAvatarClasses, getInitials, getVerdictClasses } from '../../utils/helpers'
import { StatusBadge } from '../StatusBadge/StatusBadge'

interface CandidateCardProps {
  candidate: Candidate
}

function CandidateCardComponent({ candidate }: CandidateCardProps) {
  const location = useLocation()
  const stackTags = candidate.stack
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 4)

  return (
    <Link
      to={`/candidate/${candidate.id}`}
      state={{ from: `${location.pathname}${location.search}` }}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarClasses(candidate.name)}`}
            aria-hidden="true"
          >
            {getInitials(candidate.name)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900 group-hover:text-blue-700">
              {candidate.name}
            </h3>
            <p className="mt-0.5 truncate text-sm text-slate-500">
              {candidate.city ?? 'Город не указан'} · {candidate.total_exp}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${getVerdictClasses(candidate.verdict)}`}
        >
          {candidate.verdict}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {stackTags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <span className="truncate text-xs text-slate-400">{candidate.pos_label}</span>
        <StatusBadge status={candidate.status} />
      </div>
    </Link>
  )
}

export const CandidateCard = memo(CandidateCardComponent)
