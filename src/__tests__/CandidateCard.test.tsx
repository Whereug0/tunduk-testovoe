import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CandidateCard } from '../components/CandidateCard/CandidateCard'
import { StatusBadge } from '../components/StatusBadge/StatusBadge'
import { mockCandidates } from './fixtures'

function renderCard(candidate = mockCandidates[0]) {
  return render(
    <MemoryRouter>
      <CandidateCard candidate={candidate} />
    </MemoryRouter>,
  )
}

describe('CandidateCard verdict color indication', () => {
  it('renders a green-tinted badge for ПОДХОДИТ', () => {
    renderCard(mockCandidates[0])
    const badge = screen.getByText('ПОДХОДИТ')
    expect(badge.className).toMatch(/emerald/)
  })

  it('renders an amber-tinted badge for ЧАСТИЧНО', () => {
    renderCard(mockCandidates[1])
    const badge = screen.getByText('ЧАСТИЧНО')
    expect(badge.className).toMatch(/amber/)
  })

  it('renders a rose-tinted badge for НЕ СООТВЕТСТВУЕТ', () => {
    renderCard(mockCandidates[2])
    const badge = screen.getByText('НЕ СООТВЕТСТВУЕТ')
    expect(badge.className).toMatch(/rose/)
  })

  it('links to the candidate detail page', () => {
    renderCard(mockCandidates[0])
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/candidate/ivanov')
  })

  it('falls back gracefully when city is missing', () => {
    renderCard({ ...mockCandidates[0], city: null })
    expect(screen.getByText(/Город не указан/)).toBeInTheDocument()
  })
})

describe('StatusBadge color indication', () => {
  function renderStatus(status: (typeof mockCandidates)[number]['status']) {
    return render(<StatusBadge status={status} />)
  }

  it('shows the Russian label for each status code', () => {
    renderStatus('new')
    expect(screen.getByText('Новый')).toBeInTheDocument()
  })

  it('applies a distinct color for "invited"', () => {
    renderStatus('invited')
    const badge = screen.getByText('Приглашён')
    expect(badge.className).toMatch(/emerald/)
  })

  it('applies a distinct color for "rejected"', () => {
    renderStatus('rejected')
    const badge = screen.getByText('Отклонён')
    expect(badge.className).toMatch(/rose/)
  })
})
