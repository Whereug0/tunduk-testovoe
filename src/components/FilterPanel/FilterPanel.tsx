import { memo } from 'react'
import type { ReactNode } from 'react'
import type { SortDirection, SortField, Verdict } from '../../types/candidate'
import { VERDICT_FILTERS } from '../../types/candidate'

interface FilterPanelProps {
  verdict: Verdict | 'all'
  sortField: SortField
  sortDirection: SortDirection
  onVerdictChange: (verdict: Verdict | 'all') => void
  onSortChange: (field: SortField) => void
}

const SORT_LABELS: Record<SortField, string> = {
  name: 'Имени',
  experience: 'Опыту',
  createdAt: 'Дате добавления',
}

const SORT_FIELDS = Object.keys(SORT_LABELS) as SortField[]

function FilterPanelComponent({
  verdict,
  sortField,
  sortDirection,
  onVerdictChange,
  onSortChange,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по вердикту">
        <FilterButton active={verdict === 'all'} onClick={() => onVerdictChange('all')}>
          Все
        </FilterButton>
        {VERDICT_FILTERS.map((v) => (
          <FilterButton key={v} active={verdict === v} onClick={() => onVerdictChange(v)}>
            {v}
          </FilterButton>
        ))}
      </div>
      <div className="flex items-center gap-2 text-sm">
        <label htmlFor="sort-field" className="whitespace-nowrap text-slate-500">
          Сортировка:
        </label>
        <select
          id="sort-field"
          value={sortField}
          onChange={(e) => onSortChange(e.target.value as SortField)}
          className="rounded-md border border-slate-300 px-2 py-1.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          {SORT_FIELDS.map((field) => (
            <option key={field} value={field}>
              {SORT_LABELS[field]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onSortChange(sortField)}
          aria-label={sortDirection === 'asc' ? 'Сортировка по возрастанию' : 'Сортировка по убыванию'}
          className="rounded-md border border-slate-300 px-2.5 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  )
}

interface FilterButtonProps {
  active: boolean
  onClick: () => void
  children: ReactNode
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}

export const FilterPanel = memo(FilterPanelComponent)
