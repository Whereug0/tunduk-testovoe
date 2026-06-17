import { useEffect, useState } from 'react'
import { useCandidatesStore } from '../store/candidatesStore'
import { useCandidates } from '../hooks/useCandidates'
import { CandidateList } from '../components/CandidateList/CandidateList'
import { VirtualizedCandidateList } from '../components/CandidateList/VirtualizedCandidateList'
import { FilterPanel } from '../components/FilterPanel/FilterPanel'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { Pagination } from '../components/UI/Pagination'
import { Spinner } from '../components/UI/Spinner'
import { EmptyState } from '../components/UI/EmptyState'
import { SegmentedControl } from '../components/UI/SegmentedControl'
import type { DatasetKey } from '../services/mockData'

type ViewMode = 'paginated' | 'virtualized'

export function CandidatesPage() {
  const dataset = useCandidatesStore((s) => s.dataset)
  const loadCandidates = useCandidatesStore((s) => s.loadCandidates)
  const setDataset = useCandidatesStore((s) => s.setDataset)
  const {
    pageItems,
    allFiltered,
    total,
    page,
    pageCount,
    loading,
    error,
    filters,
    setVerdict,
    setSearch,
    setSort,
    setPage,
  } = useCandidates()

  const [viewMode, setViewMode] = useState<ViewMode>('paginated')

  useEffect(() => {
    void loadCandidates()
  }, [])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            CV
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold leading-tight text-slate-900">Candidate Dashboard</h1>
            <p className="truncate text-xs text-slate-500">
              Кандидаты на вакансию · найдено{' '}
              <span className="font-medium text-slate-700">{total}</span>
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center justify-end gap-3 sm:gap-6">
          <SegmentedControl
            label="Датасет"
            value={dataset}
            onChange={(next: DatasetKey) => void setDataset(next)}
            options={[
              { value: 'default', label: '25' },
              { value: 'large', label: '120' },
            ]}
          />
          <SegmentedControl
            label="Вид"
            value={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'paginated', label: 'Пагинация' },
              { value: 'virtualized', label: 'Виртуализация' },
            ]}
          />
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <SearchBar value={filters.search} onChange={setSearch} />
          <FilterPanel
            verdict={filters.verdict}
            sortField={filters.sortField}
            sortDirection={filters.sortDirection}
            onVerdictChange={setVerdict}
            onSortChange={setSort}
          />
        </div>

        {loading && <Spinner label="Загружаем кандидатов..." />}

        {!loading && error && (
          <EmptyState
            title="Не удалось загрузить кандидатов"
            description={error}
            action={
              <button
                type="button"
                onClick={() => void loadCandidates()}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Повторить попытку
              </button>
            }
          />
        )}

        {!loading && !error && total === 0 && (
          <EmptyState
            title="Кандидаты не найдены"
            description="Попробуйте изменить фильтры или поисковый запрос"
          />
        )}

        {!loading && !error && total > 0 && (
          <>
            {viewMode === 'paginated' ? (
              <>
                <CandidateList candidates={pageItems} />
                <div className="mt-8">
                  <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
                </div>
              </>
            ) : (
              <VirtualizedCandidateList candidates={allFiltered} height={640} />
            )}
          </>
        )}
      </main>
    </div>
  )
}
