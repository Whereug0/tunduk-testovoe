import { filterAndSortCandidates } from '../utils/filterCandidates'
import { mockCandidates } from './fixtures'

const baseFilters = {
  verdict: 'all' as const,
  search: '',
  sortField: 'createdAt' as const,
  sortDirection: 'asc' as const,
}

describe('filterAndSortCandidates', () => {
  it('returns all candidates when verdict filter is "all"', () => {
    const result = filterAndSortCandidates(mockCandidates, baseFilters)
    expect(result).toHaveLength(3)
  })

  it('filters candidates by verdict', () => {
    const result = filterAndSortCandidates(mockCandidates, { ...baseFilters, verdict: 'ПОДХОДИТ' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('ivanov')
  })

  it('filters by a different verdict value', () => {
    const result = filterAndSortCandidates(mockCandidates, {
      ...baseFilters,
      verdict: 'НЕ СООТВЕТСТВУЕТ',
    })
    expect(result.map((c) => c.id)).toEqual(['sidorov'])
  })

  it('returns an empty array when no candidate matches the verdict', () => {
    const onlyOneVerdict = mockCandidates.filter((c) => c.verdict === 'ПОДХОДИТ')
    const result = filterAndSortCandidates(onlyOneVerdict, { ...baseFilters, verdict: 'ЧАСТИЧНО' })
    expect(result).toEqual([])
  })

  it('filters candidates by name search (case-insensitive)', () => {
    const result = filterAndSortCandidates(mockCandidates, { ...baseFilters, search: 'петров' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('petrov')
  })

  it('combines verdict and search filters', () => {
    const result = filterAndSortCandidates(mockCandidates, {
      ...baseFilters,
      verdict: 'ПОДХОДИТ',
      search: 'петров',
    })
    expect(result).toEqual([])
  })

  it('sorts candidates by name ascending', () => {
    const result = filterAndSortCandidates(mockCandidates, { ...baseFilters, sortField: 'name' })
    expect(result.map((c) => c.id)).toEqual(['ivanov', 'petrov', 'sidorov'])
  })

  it('sorts candidates by experience descending', () => {
    const result = filterAndSortCandidates(mockCandidates, {
      ...baseFilters,
      sortField: 'experience',
      sortDirection: 'desc',
    })
    expect(result.map((c) => c.id)).toEqual(['petrov', 'ivanov', 'sidorov'])
  })

  it('sorts candidates by creation date', () => {
    const result = filterAndSortCandidates(mockCandidates, {
      ...baseFilters,
      sortField: 'createdAt',
      sortDirection: 'desc',
    })
    expect(result.map((c) => c.id)).toEqual(['sidorov', 'petrov', 'ivanov'])
  })
})
