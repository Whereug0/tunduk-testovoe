import { useMemo } from 'react'
import { useCandidatesStore } from '../store/candidatesStore'
import { useCandidateFilters } from './useCandidateFilters'
import { filterAndSortCandidates } from '../utils/filterCandidates'

export const PAGE_SIZE = 10

export function useCandidates() {
  const candidates = useCandidatesStore((s) => s.candidates)
  const loading = useCandidatesStore((s) => s.loading)
  const error = useCandidatesStore((s) => s.error)
  const statusUpdating = useCandidatesStore((s) => s.statusUpdating)
  const { filters, setVerdict, setSearch, setSort, setPage, resetFilters } = useCandidateFilters()

  const filtered = useMemo(
    () => filterAndSortCandidates(candidates, filters),
    [candidates, filters.verdict, filters.search, filters.sortField, filters.sortDirection],
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(Math.max(1, filters.page), pageCount)

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, safePage])

  return {
    pageItems,
    allFiltered: filtered,
    total: filtered.length,
    page: safePage,
    pageCount,
    pageSize: PAGE_SIZE,
    loading,
    error,
    statusUpdating,
    filters,
    setVerdict,
    setSearch,
    setSort,
    setPage,
    resetFilters,
  }
}
