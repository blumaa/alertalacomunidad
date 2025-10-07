import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test/test-utils'
import userEvent from '@testing-library/user-event'
import { AddressInputBottomSheet } from './AddressInputBottomSheet'

// TDD: Define expected behavior for address input bottom sheet
describe('AddressInputBottomSheet', () => {
  const mockOnContinue = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders when open is true', async () => {
    render(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/ingresa la dirección/i)).toBeInTheDocument()
    })
  })

  it('does not render when open is false', () => {
    render(
      <AddressInputBottomSheet
        open={false}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    expect(screen.queryByText(/ingresa la dirección/i)).not.toBeInTheDocument()
  })

  it('renders address input field with label and placeholder', async () => {
    render(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/ej.*main.*st/i)).toBeInTheDocument()
    })
  })

  it('renders helper text about being specific', async () => {
    render(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/sé lo más específico posible/i)).toBeInTheDocument()
    })
  })

  it('renders cancel and continue buttons', async () => {
    render(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument()
    })
  })

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    const cancelButton = await screen.findByRole('button', { name: /cancelar/i })
    await user.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalledTimes(1)
  })

  it('calls onContinue with address when continue is clicked with valid input', async () => {
    const user = userEvent.setup()
    render(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    const input = await screen.findByLabelText(/dirección/i)
    const continueButton = await screen.findByRole('button', { name: /continuar/i })

    await user.type(input, '123 Main St, Chicago')
    await user.click(continueButton)

    expect(mockOnContinue).toHaveBeenCalledWith('123 Main St, Chicago')
  })

  it('shows error when trying to continue with empty address', async () => {
    const user = userEvent.setup()
    render(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    const continueButton = await screen.findByRole('button', { name: /continuar/i })
    await user.click(continueButton)

    await waitFor(() => {
      expect(screen.getByText(/la dirección es requerida/i)).toBeInTheDocument()
    })

    expect(mockOnContinue).not.toHaveBeenCalled()
  })

  it('clears error when user starts typing', async () => {
    const user = userEvent.setup()
    render(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    const input = await screen.findByLabelText(/dirección/i)
    const continueButton = await screen.findByRole('button', { name: /continuar/i })

    // First, trigger error
    await user.click(continueButton)

    await waitFor(() => {
      expect(screen.getByText(/la dirección es requerida/i)).toBeInTheDocument()
    })

    // Then start typing
    await user.type(input, 'Main St')

    // Error should be cleared
    expect(screen.queryByText(/la dirección es requerida/i)).not.toBeInTheDocument()
  })

  it('clears input when closed and reopened', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    const input = await screen.findByLabelText(/dirección/i) as HTMLInputElement

    // Type something
    await user.type(input, '123 Main St')
    expect(input.value).toBe('123 Main St')

    // Close
    rerender(
      <AddressInputBottomSheet
        open={false}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    // Reopen
    rerender(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    // Wait for input to appear again and check it's cleared
    const inputAfter = await screen.findByLabelText(/dirección/i) as HTMLInputElement
    expect(inputAfter.value).toBe('')
  })

  it('is accessible with proper ARIA attributes', async () => {
    render(
      <AddressInputBottomSheet
        open={true}
        onContinue={mockOnContinue}
        onCancel={mockOnCancel}
      />
    )

    const input = await screen.findByLabelText(/dirección/i)
    expect(input).toHaveAttribute('required')
    expect(input).toHaveAttribute('aria-required', 'true')
  })
})
