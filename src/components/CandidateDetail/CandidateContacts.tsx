import type { ReactNode } from 'react'
import type { Candidate } from '../../types/candidate'

interface CandidateContactsProps {
  candidate: Candidate
}

export function CandidateContacts({ candidate }: CandidateContactsProps) {
  return (
    <section aria-labelledby="contacts-heading">
      <h2 id="contacts-heading" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Контакты
      </h2>
      <dl className="mt-3 space-y-2.5 text-sm">
        <ContactRow label="Город">{candidate.city ?? '—'}</ContactRow>
        <ContactRow label="Email">
          <a href={`mailto:${candidate.email}`} className="text-blue-600 hover:underline">
            {candidate.email}
          </a>
        </ContactRow>
        <ContactRow label="Телефон">
          {candidate.phone ? (
            <a href={`tel:${candidate.phone}`} className="text-blue-600 hover:underline">
              {candidate.phone}
            </a>
          ) : (
            '—'
          )}
        </ContactRow>
        <ContactRow label="Telegram">{candidate.tg}</ContactRow>
        {candidate.file && <ContactRow label="Резюме">{candidate.file}</ContactRow>}
      </dl>
    </section>
  )
}

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-slate-400">{label}</dt>
      <dd className="truncate text-right font-medium text-slate-700">{children}</dd>
    </div>
  )
}
