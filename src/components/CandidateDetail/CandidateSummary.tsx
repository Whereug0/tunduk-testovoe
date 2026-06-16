interface CandidateSummaryProps {
  summary: string
}

export function CandidateSummary({ summary }: CandidateSummaryProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="rounded-xl border border-blue-100 bg-blue-50/60 p-4"
    >
      <h2 id="summary-heading" className="text-xs font-semibold uppercase tracking-wide text-blue-700">
        Summary
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{summary}</p>
    </section>
  )
}
