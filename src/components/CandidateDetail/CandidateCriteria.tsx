import type { CriteriaItem } from '../../types/candidate'
import { getCriteriaClasses, getCriteriaIcon } from '../../utils/helpers'

interface CandidateCriteriaProps {
  criteria: CriteriaItem[]
}

export function CandidateCriteria({ criteria }: CandidateCriteriaProps) {
  return (
    <section aria-labelledby="criteria-heading">
      <h2 id="criteria-heading" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Критерии оценки
      </h2>
      <ul className="mt-3 space-y-2">
        {criteria.map(([status, text], index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-white p-2.5 text-sm"
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getCriteriaClasses(status)}`}
              aria-hidden="true"
            >
              {getCriteriaIcon(status)}
            </span>
            <span className="text-slate-700">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
