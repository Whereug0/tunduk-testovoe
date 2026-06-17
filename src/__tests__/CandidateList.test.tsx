import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CandidateList } from '../components/CandidateList/CandidateList'
import { mockCandidates } from './fixtures'

function renderList(candidates: typeof mockCandidates) {
  return render(
    <MemoryRouter>
      <CandidateList candidates={candidates} />
    </MemoryRouter>,
  )
}

describe('CandidateList', () => {
  it('renders a card for every candidate', () => {
    renderList(mockCandidates)
    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getByText('Иванов Иван Иванович')).toBeInTheDocument()
    expect(screen.getByText('Петров Пётр Петрович')).toBeInTheDocument()
    expect(screen.getByText('Сидоров Сидор Сидорович')).toBeInTheDocument()
  })

  it('renders nothing but an empty grid when given an empty array', () => {
    renderList([])
    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })
})
