interface CandidateQuestionsProps {
  questions: string[]
}

export function CandidateQuestions({ questions }: CandidateQuestionsProps) {
  if (questions.length === 0) return null

  return (
    <section aria-labelledby="questions-heading">
      <h2 id="questions-heading" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Вопросы для собеседования
      </h2>
      <ul className="mt-3 space-y-2">
        {questions.map((question, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-white p-2.5 text-sm text-slate-700"
          >
            <span className="mt-0.5 text-slate-300">?</span>
            <span>{question}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
