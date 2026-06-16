import { Link } from 'react-router-dom'
import { EmptyState } from '../components/UI/EmptyState'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <EmptyState
        title="Страница не найдена"
        description="Проверьте адрес или вернитесь к списку кандидатов"
        action={
          <Link to="/" className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">
            На главную
          </Link>
        }
      />
    </div>
  )
}
