import { CANDIDATE_STATUSES } from '../../types/candidate'
import type { CandidateStatus } from '../../types/candidate'
import { getStatusLabel } from '../../utils/helpers'

interface StatusSelectProps {
  status: CandidateStatus
  updating: boolean
  onChange: (status: CandidateStatus) => void
}

export function StatusSelect({ status, updating, onChange }: StatusSelectProps) {
  return (
    <section>
      <label htmlFor="candidate-status" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Статус кандидата
      </label>
      <div className="mt-2 flex items-center gap-2">
        <select
          id="candidate-status"
          value={status}
          disabled={updating}
          onChange={(e) => onChange(e.target.value as CandidateStatus)}
          className="w-full rounded-md border border-slate-300 px-2.5 py-2 text-sm font-medium text-slate-700 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
        >
          {CANDIDATE_STATUSES.map((s) => (
            <option key={s} value={s}>
              {getStatusLabel(s)}
            </option>
          ))}
        </select>
        {updating && (
          <span
            role="status"
            className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500"
            aria-label="Обновление статуса"
          />
        )}
      </div>
    </section>
  )
}
