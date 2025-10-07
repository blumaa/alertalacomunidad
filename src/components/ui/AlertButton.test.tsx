import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '../../test/test-utils'
import userEvent from '@testing-library/user-event'
import { AlertButton } from './AlertButton'

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(1000000))
  // Clear localStorage
  localStorage.clear()
})

afterEach(() => {
  vi.useRealTimers()
})

// TDD: Define expected behavior for alert button with rate limiting
describe('AlertButton', () => {
  const mockOnClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the alert button', () => {
    render(<AlertButton onClick={mockOnClick} />)

    expect(screen.getByRole('button', { name: /alerta la comunidad/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked and not rate limited', async () => {
    const user = userEvent.setup({ delay: null })
    render(<AlertButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /alerta la comunidad/i })
    await user.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('shows countdown when rate limited', async () => {
    const user = userEvent.setup({ delay: null })
    render(<AlertButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /alerta la comunidad/i })

    // First click - should work and trigger rate limit
    await act(async () => {
      await user.click(button)
    })
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    // Let the interval run once to detect rate limit
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })

    // Button should show countdown with 15 minutes remaining
    expect(screen.getByText(/próxima alerta disponible en/i)).toBeInTheDocument()
    expect(screen.getByText(/15.*minut/i)).toBeInTheDocument()
  })

  it('disables button during rate limit period', async () => {
    const user = userEvent.setup({ delay: null })
    render(<AlertButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /alerta la comunidad/i })

    // First click - trigger rate limit
    await act(async () => {
      await user.click(button)
    })
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    // Let the interval run to detect rate limit
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })

    // Button should be disabled
    const buttonAfter = screen.getByRole('button')
    expect(buttonAfter).toBeDisabled()
  })

  it('re-enables button after rate limit expires', async () => {
    const user = userEvent.setup({ delay: null })
    render(<AlertButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /alerta la comunidad/i })

    // First click - trigger rate limit
    await act(async () => {
      await user.click(button)
    })
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    // Advance time by 15 minutes + 1 second
    act(() => {
      vi.setSystemTime(new Date(1000000 + (15 * 60 + 1) * 1000))
    })

    // Let interval run to detect rate limit has expired
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })

    // Button should be enabled again
    const buttonAfter = screen.getByRole('button', { name: /alerta la comunidad/i })
    expect(buttonAfter).not.toBeDisabled()

    // Should be able to click again
    await user.click(buttonAfter)
    expect(mockOnClick).toHaveBeenCalledTimes(2)
  })

  it('persists rate limit across component re-renders', () => {
    const { rerender } = render(<AlertButton onClick={mockOnClick} />)

    // Click button
    const button = screen.getByRole('button', { name: /alerta la comunidad/i })
    button.click()

    // Advance time by 1 minute
    vi.setSystemTime(new Date(1000000 + 60 * 1000))

    // Re-render component
    rerender(<AlertButton onClick={mockOnClick} />)

    // Button should still be disabled
    const buttonAfter = screen.getByRole('button')
    expect(buttonAfter).toBeDisabled()
  })

  it('formats countdown time correctly', async () => {
    const user = userEvent.setup({ delay: null })
    render(<AlertButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /alerta la comunidad/i })

    // Click to trigger rate limit
    await act(async () => {
      await user.click(button)
    })

    // Advance time by 5 minutes
    act(() => {
      vi.setSystemTime(new Date(1000000 + 5 * 60 * 1000))
    })

    // Let interval run to update countdown
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })

    // Should show "10 minutes" remaining (15 - 5 = 10)
    expect(screen.getByText(/10.*minut/i)).toBeInTheDocument()
  })

  it('is accessible with proper ARIA attributes', () => {
    render(<AlertButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /alerta la comunidad/i })
    expect(button).toHaveAttribute('type', 'button')
  })

  it('updates countdown every second', async () => {
    const user = userEvent.setup({ delay: null })
    render(<AlertButton onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /alerta la comunidad/i })

    // Click to trigger rate limit
    await act(async () => {
      await user.click(button)
    })

    // Advance time by 5 minutes
    act(() => {
      vi.setSystemTime(new Date(1000000 + 5 * 60 * 1000))
    })

    // Let interval run to update countdown
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })

    // Should show 10 minutes remaining
    expect(screen.getByText(/10.*minut/i)).toBeInTheDocument()

    // Advance by 1 minute more
    act(() => {
      vi.setSystemTime(new Date(1000000 + 6 * 60 * 1000))
    })

    // Let interval run again
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })

    // Should now show 9 minutes remaining
    expect(screen.getByText(/9.*minut/i)).toBeInTheDocument()
  })
})
