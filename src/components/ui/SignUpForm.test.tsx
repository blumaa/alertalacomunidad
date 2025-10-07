import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test/test-utils'
import userEvent from '@testing-library/user-event'
import { SignUpForm } from './SignUpForm'

// TDD: Define expected behavior for sign-up form
describe('SignUpForm', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email input field', () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />)

    expect(screen.getByRole('textbox', { name: /correo electrónico/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/tu@email\.com/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />)

    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<SignUpForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox', { name: /correo electrónico/i })
    const button = screen.getByRole('button', { name: /registrarse/i })

    await user.type(input, 'invalid-email')
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText(/por favor ingresa un email válido/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('shows validation error for empty email', async () => {
    const user = userEvent.setup()
    render(<SignUpForm onSubmit={mockOnSubmit} />)

    const button = screen.getByRole('button', { name: /registrarse/i })

    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('submits form with valid email', async () => {
    const user = userEvent.setup()
    render(<SignUpForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox', { name: /correo electrónico/i })
    const button = screen.getByRole('button', { name: /registrarse/i })

    await user.type(input, 'test@example.com')
    await user.click(button)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com')
    })
  })

  it('disables submit button during submission', async () => {
    const slowSubmit = vi.fn((): Promise<void> => new Promise(resolve => setTimeout(resolve, 100)))
    render(<SignUpForm onSubmit={slowSubmit} loading />)

    const button = screen.getByRole('button', { name: /registrarse/i })

    expect(button).toBeDisabled()
  })

  it('clears input after successful submission', async () => {
    const user = userEvent.setup()
    render(<SignUpForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox', { name: /correo electrónico/i }) as HTMLInputElement
    const button = screen.getByRole('button', { name: /registrarse/i })

    await user.type(input, 'test@example.com')
    await user.click(button)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    })

    // After submission, input should be cleared
    expect(input.value).toBe('')
  })

  it('validates email format correctly', async () => {
    const user = userEvent.setup()
    render(<SignUpForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox', { name: /correo electrónico/i })
    const button = screen.getByRole('button', { name: /registrarse/i })

    // Test various invalid formats
    const invalidEmails = ['test', 'test@', '@example.com', 'test @example.com']

    for (const email of invalidEmails) {
      await user.clear(input)
      await user.type(input, email)
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText(/por favor ingresa un email válido/i)).toBeInTheDocument()
      })

      expect(mockOnSubmit).not.toHaveBeenCalled()
      vi.clearAllMocks()
    }
  })

  it('is accessible with proper ARIA attributes', () => {
    render(<SignUpForm onSubmit={mockOnSubmit} />)

    const input = screen.getByRole('textbox', { name: /correo electrónico/i })
    const button = screen.getByRole('button', { name: /registrarse/i })

    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(button).toHaveAttribute('type', 'submit')
  })
})
