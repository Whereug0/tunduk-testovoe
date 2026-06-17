import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../components/SearchBar/SearchBar'

describe('SearchBar debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('does not call onChange on every keystroke', async () => {
    const user = userEvent.setup({ delay: null, advanceTimers: jest.advanceTimersByTime })
    const onChange = jest.fn()
    render(<SearchBar value="" onChange={onChange} />)

    const input = screen.getByLabelText('Поиск по ФИО')
    await user.type(input, 'Иванов')

    expect(onChange).not.toHaveBeenCalled()

    await act(async () => {
      jest.advanceTimersByTime(300)
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('Иванов')
  })

  it('reflects keystrokes in the input immediately (no input lag)', async () => {
    const user = userEvent.setup({ delay: null, advanceTimers: jest.advanceTimersByTime })
    render(<SearchBar value="" onChange={jest.fn()} />)

    const input = screen.getByLabelText('Поиск по ФИО') as HTMLInputElement
    await user.type(input, 'Пет')

    expect(input.value).toBe('Пет')
  })

  it('syncs the input when the external value changes (e.g. filters reset)', () => {
    const { rerender } = render(<SearchBar value="Иванов" onChange={jest.fn()} />)
    const input = screen.getByLabelText('Поиск по ФИО') as HTMLInputElement
    expect(input.value).toBe('Иванов')

    rerender(<SearchBar value="" onChange={jest.fn()} />)
    expect(input.value).toBe('')
  })
})
