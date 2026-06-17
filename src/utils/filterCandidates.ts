import type { Candidate, CandidateFilters } from '../types/candidate'

function parseExperienceYears(totalExp: string): number {
  const match = /[\d.]+/.exec(totalExp)
  return match ? parseFloat(match[0]) : 0
}

export function filterAndSortCandidates(
  candidates: Candidate[],
  filters: Pick<CandidateFilters, 'verdict' | 'search' | 'sortField' | 'sortDirection'>,
): Candidate[] {
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
}
