import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { CandidateFilters, SortField, Verdict } from '../types/candidate'
import { VERDICT_FILTERS } from '../types/candidate'

const DEFAULTS: CandidateFilters = {
  verdict: 'all',
  search: '',
  sortField: 'createdAt',
  sortDirection: 'desc',
  page: 1,
}

const SORT_FIELDS: readonly SortField[] = ['name', 'experience', 'createdAt']

function isVerdict(value: string | null): value is Verdict {
  return value !== null && (VERDICT_FILTERS as readonly string[]).includes(value)
}

function isSortField(value: string | null): value is SortField {
  return value !== null && (SORT_FIELDS as readonly string[]).includes(value)
}

export function useCandidateFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: CandidateFilters = useMemo(() => {
    const verdictParam = searchParams.get('verdict')
    const sortFieldParam = searchParams.get('sort')
    const sortDirParam = searchParams.get('dir')
    const pageParam = searchParams.get('page')

    return {
      verdict: isVerdict(verdictParam) ? verdictParam : DEFAULTS.verdict,
      search: searchParams.get('q') ?? DEFAULTS.search,
      sortField: isSortField(sortFieldParam) ? sortFieldParam : DEFAULTS.sortField,
      sortDirection: sortDirParam === 'asc' ? 'asc' : sortDirParam === 'desc' ? 'desc' : DEFAULTS.sortDirection,
      page: pageParam && Number(pageParam) > 0 ? Number(pageParam) : DEFAULTS.page,
    }
  }, [searchParams])

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>, resetPage = false) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          for (const [key, value] of Object.entries(updates)) {
            if (value === undefined || value === '') {
              next.delete(key)
            } else {
              next.set(key, value)
            }
          }
          if (resetPage) next.delete('page')
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const setVerdict = useCallback(
    (verdict: Verdict | 'all') => updateParams({ verdict: verdict === 'all' ? undefined : verdict }, true),
    [updateParams],
  )

  const setSearch = useCallback(
    (search: string) => updateParams({ q: search || undefined }, true),
    [updateParams],
  )

  const setSort = useCallback(
    (field: SortField) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          const currentField = isSortField(next.get('sort')) ? next.get('sort') : DEFAULTS.sortField
          const currentDir = next.get('dir') === 'asc' ? 'asc' : 'desc'
          if (currentField === field) {
            next.set('dir', currentDir === 'asc' ? 'desc' : 'asc')
          } else {
            next.set('sort', field)
            next.set('dir', 'asc')
          }
          next.delete('page')
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const setPage = useCallback(
    (page: number) => updateParams({ page: page > 1 ? String(page) : undefined }),
    [updateParams],
  )

  const resetFilters = useCallback(() => setSearchParams(new URLSearchParams(), { replace: true }), [setSearchParams])

  return { filters, setVerdict, setSearch, setSort, setPage, resetFilters }
}
