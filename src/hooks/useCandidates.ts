import { useMemo } from 'react'
import { useCandidatesStore } from '../store/candidatesStore'
import { useCandidateFilters } from './useCandidateFilters'

export const PAGE_SIZE = 10

function parseExperienceYears(totalExp: string): number {
  const match = /[\d.]+/.exec(totalExp)
  return match ? parseFloat(match[0]) : 0
}

export function useCandidates() {
  const candidates = useCandidatesStore((s) => s.candidates)
  const loading = useCandidatesStore((s) => s.loading)
  const error = useCandidatesStore((s) => s.error)
  const statusUpdating = useCandidatesStore((s) => s.statusUpdating)
  const { filters, setVerdict, setSearch, setSort, setPage, resetFilters } = useCandidateFilters()

  const filtered = useMemo(() => {
    let result = candidates

    if (filters.verdict !== 'all') {
      result = result.filter((c) => c.verdict === filters.verdict)
    }

    const query = filters.search.trim().toLowerCase()
    if (query) {
      result = result.filter((c) => c.name.toLowerCase().includes(query))
    }

    const direction = filters.sortDirection === 'asc' ? 1 : -1
    result = [...result].sort((a, b) => {
      switch (filters.sortField) {
        case 'name':
          return a.name.localeCompare(b.name, 'ru') * direction
        case 'experience':
          return (parseExperienceYears(a.total_exp) - parseExperienceYears(b.total_exp)) * direction
        case 'createdAt':
        default:
          return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * direction
      }
    })

    return result
  }, [candidates, filters.verdict, filters.search, filters.sortField, filters.sortDirection])

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
