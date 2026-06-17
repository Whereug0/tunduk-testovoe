import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCandidatesStore } from '../store/candidatesStore'
import { Spinner } from '../components/UI/Spinner'
import { EmptyState } from '../components/UI/EmptyState'
import { CandidateContacts } from '../components/CandidateDetail/CandidateContacts'
import { CandidateSummary } from '../components/CandidateDetail/CandidateSummary'
import { CandidateExperience } from '../components/CandidateDetail/CandidateExperience'
import { CandidateMeta } from '../components/CandidateDetail/CandidateMeta'
import { CandidateCriteria } from '../components/CandidateDetail/CandidateCriteria'
import { CandidateQuestions } from '../components/CandidateDetail/CandidateQuestions'
import { StatusSelect } from '../components/CandidateDetail/StatusSelect'
import { getAvatarClasses, getInitials, getVerdictClasses } from '../utils/helpers'

interface NavigationState {
  from?: string
}

export function CandidateDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const candidates = useCandidatesStore((s) => s.candidates)
  const loading = useCandidatesStore((s) => s.loading)
  const error = useCandidatesStore((s) => s.error)
  const loadCandidates = useCandidatesStore((s) => s.loadCandidates)
  const changeStatus = useCandidatesStore((s) => s.changeStatus)
  const statusUpdating = useCandidatesStore((s) => s.statusUpdating)

  useEffect(() => {
    if (candidates.length === 0) {
      void loadCandidates()
    }
  }, [])

  const candidate = candidates.find((c) => c.id === id)
  const backTo = (location.state as NavigationState | null)?.from ?? '/'

  if (loading) {
    return <Spinner label="Загружаем данные кандидата..." />
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState title="Ошибка загрузки" description={error} />
      </div>
    )
  }

  if (!candidate) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          title="Кандидат не найден"
          description={`Кандидат с идентификатором «${id}» отсутствует в списке`}
          action={
            <Link
              to="/"
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Назад к списку
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
          >
            ← Назад к списку
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/60 p-5 sm:p-6">
            <div className="flex min-w-0 items-center gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold ${getAvatarClasses(candidate.name)}`}
                aria-hidden="true"
              >
                {getInitials(candidate.name)}
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold text-slate-900">{candidate.name}</h1>
                <p className="mt-1 truncate text-sm text-slate-500">{candidate.pos_label}</p>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-sm font-medium ${getVerdictClasses(candidate.verdict)}`}
            >
              {candidate.verdict}
            </span>
          </header>

          <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-3">
            <div className="space-y-6 lg:order-2 lg:col-span-1">
              <StatusSelect
                status={candidate.status}
                updating={Boolean(statusUpdating[candidate.id])}
                onChange={(status) => void changeStatus(candidate.id, status)}
              />
              <div className="border-t border-slate-100 pt-5">
                <CandidateContacts candidate={candidate} />
              </div>
              <div className="space-y-5 border-t border-slate-100 pt-5">
                <CandidateMeta education={candidate.edu} stack={candidate.stack} />
              </div>
            </div>

            <div className="space-y-6 lg:order-1 lg:col-span-2">
              <CandidateSummary summary={candidate.summary} />
              <CandidateExperience exp={candidate.exp} totalExp={candidate.total_exp} />
              <CandidateCriteria criteria={candidate.criteria} />
              <CandidateQuestions questions={candidate.questions} />
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
