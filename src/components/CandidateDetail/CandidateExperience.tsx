import type { ExperienceItem } from '../../types/candidate'

interface CandidateExperienceProps {
  exp: ExperienceItem[]
  totalExp: string
}

export function CandidateExperience({ exp, totalExp }: CandidateExperienceProps) {
  return (
    <section aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Опыт работы <span className="font-normal normal-case text-slate-400">· {totalExp}</span>
      </h2>
      <ol className="mt-3 space-y-2.5">
        {exp.map(([period, company, role, duration], index) => (
          <li
            key={`${company}-${index}`}
            className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium text-slate-800">{company}</span>
              <span className="text-xs text-slate-400">{period}</span>
            </div>
            <p className="mt-1 text-slate-600">
              {role} · {duration}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
