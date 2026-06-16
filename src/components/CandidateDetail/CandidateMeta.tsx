interface CandidateMetaProps {
  education: string
  stack: string
}

export function CandidateMeta({ education, stack }: CandidateMetaProps) {
  return (
    <>
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Образование</h2>
        <p className="mt-3 text-sm text-slate-700">{education}</p>
      </section>
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Стек</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {stack.split(',').map((item) => (
            <span
              key={item.trim()}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
            >
              {item.trim()}
            </span>
          ))}
        </div>
      </section>
    </>
  )
}
