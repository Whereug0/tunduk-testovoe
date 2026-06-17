import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { useCandidatesStore } from '../store/candidatesStore'
import { mockCandidates } from './fixtures'

jest.mock('../services/api', () => ({
  fetchCandidates: jest.fn(),
  updateCandidateStatus: jest.fn(),
}))

import { fetchCandidates } from '../services/api'

const mockedFetchCandidates = fetchCandidates as jest.MockedFunction<typeof fetchCandidates>

function resetStore() {
  useCandidatesStore.setState({
    candidates: [],
    dataset: 'default',
    loading: false,
    error: null,
    statusUpdating: {},
  })
}

beforeEach(() => {
  resetStore()
  window.history.pushState({}, '', '/')
  mockedFetchCandidates.mockReset()
})

describe('Candidate list -> detail navigation', () => {
  it('navigates from the list to a candidate detail page and back', async () => {
    mockedFetchCandidates.mockResolvedValue(mockCandidates)
    const user = userEvent.setup()

    render(<App />)

    await waitFor(() => expect(screen.getByText('Иванов Иван Иванович')).toBeInTheDocument())

    await user.click(screen.getByText('Иванов Иван Иванович'))

    expect(await screen.findByText('← Назад к списку')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Иванов Иван Иванович' })).toBeInTheDocument()
    expect(screen.getByText('Опытный React-разработчик.')).toBeInTheDocument()

    await user.click(screen.getByText('← Назад к списку'))

    expect(await screen.findByText('Петров Пётр Петрович')).toBeInTheDocument()
  })

  it('shows a 404 message for an unknown candidate id', async () => {
    mockedFetchCandidates.mockResolvedValue(mockCandidates)
    window.history.pushState({}, '', '/candidate/does-not-exist')

    render(<App />)

    expect(await screen.findByText('Кандидат не найден')).toBeInTheDocument()
  })
})

describe('Candidate list edge cases', () => {
  it('shows an empty state when no candidates match the filters', async () => {
    mockedFetchCandidates.mockResolvedValue(mockCandidates)
    const user = userEvent.setup()

    render(<App />)
    await waitFor(() => expect(screen.getByText('Иванов Иван Иванович')).toBeInTheDocument())

    await user.type(screen.getByLabelText('Поиск по ФИО'), 'нет такого кандидата')

    expect(await screen.findByText('Кандидаты не найдены')).toBeInTheDocument()
  })

  it('shows an error state with a retry action when loading fails', async () => {
    mockedFetchCandidates.mockRejectedValue(new Error('Сеть недоступна'))

    render(<App />)

    expect(await screen.findByText('Не удалось загрузить кандидатов')).toBeInTheDocument()
    expect(screen.getByText('Сеть недоступна')).toBeInTheDocument()
    expect(screen.getByText('Повторить попытку')).toBeInTheDocument()
  })
})
