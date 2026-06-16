import { memo } from 'react'
import type { CandidateStatus } from '../../types/candidate'
import { getStatusClasses, getStatusLabel } from '../../utils/helpers'

interface StatusBadgeProps {
  status: CandidateStatus
}

function StatusBadgeComponent({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap ${getStatusClasses(status)}`}
    >
      {getStatusLabel(status)}
    </span>
  )
}

export const StatusBadge = memo(StatusBadgeComponent)
