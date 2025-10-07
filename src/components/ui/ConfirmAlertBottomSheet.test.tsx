import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test/test-utils'
import userEvent from '@testing-library/user-event'
import { ConfirmAlertBottomSheet } from './ConfirmAlertBottomSheet'

// TDD: Define expected behavior for confirm alert bottom sheet
describe('ConfirmAlertBottomSheet', () => {
  const mockOnConfirm = vi.fn()
  const mockOnCancel = vi.fn()
  const testAddress = '123 Main St, Chicago'
  const testSubscriberCount = 150

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders when open is true', async () => {
    render(
      <ConfirmAlertBottomSheet
        open={true}
        address={testAddress}
        subscriberCount={testSubscriberCount}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/confirmar alerta/i)).toBeInTheDocument()
    })
  })

  it('does not render when open is false', () => {
    render(
      <ConfirmAlertBottomSheet
        open={false}
        address={testAddress}
        subscriberCount={testSubscriberCount}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    expect(screen.queryByText(/confirmar alerta/i)).not.toBeInTheDocument()
  })

  it('displays the address', async () => {
    render(
      <ConfirmAlertBottomSheet
        open={true}
        address={testAddress}
        subscriberCount={testSubscriberCount}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(testAddress)).toBeInTheDocument()
    })
  })

  it('displays the subscriber count in the question', async () => {
    render(
      <ConfirmAlertBottomSheet
        open={true}
        address={testAddress}
        subscriberCount={testSubscriberCount}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/enviar alerta a 150 suscriptores/i)).toBeInTheDocument()
    })
  })

  it('displays reminder message', async () => {
    render(
      <ConfirmAlertBottomSheet
        open={true}
        address={testAddress}
        subscriberCount={testSubscriberCount}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/recuerda.*solo reporta actividad que realmente estás presenciando/i)).toBeInTheDocument()
    })
  })

  it('renders cancel and send alert buttons', async () => {
    render(
      <ConfirmAlertBottomSheet
        open={true}
        address={testAddress}
        subscriberCount={testSubscriberCount}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /enviar alerta/i })).toBeInTheDocument()
    })
  })

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <ConfirmAlertBottomSheet
        open={true}
        address={testAddress}
        subscriberCount={testSubscriberCount}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    const cancelButton = await screen.findByRole('button', { name: /cancelar/i })
    await user.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalledTimes(1)
    expect(mockOnConfirm).not.toHaveBeenCalled()
  })

  it('calls onConfirm when send alert button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <ConfirmAlertBottomSheet
        open={true}
        address={testAddress}
        subscriberCount={testSubscriberCount}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    const sendButton = await screen.findByRole('button', { name: /enviar alerta/i })
    await user.click(sendButton)

    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    expect(mockOnCancel).not.toHaveBeenCalled()
  })

  it('displays location label', async () => {
    render(
      <ConfirmAlertBottomSheet
        open={true}
        address={testAddress}
        subscriberCount={testSubscriberCount}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/ubicación/i)).toBeInTheDocument()
    })
  })

  it('handles different subscriber counts correctly', async () => {
    render(
      <ConfirmAlertBottomSheet
        open={true}
        address={testAddress}
        subscriberCount={1}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/enviar alerta a 1 suscriptor/i)).toBeInTheDocument()
    })
  })

  it('is accessible with proper ARIA attributes', async () => {
    render(
      <ConfirmAlertBottomSheet
        open={true}
        address={testAddress}
        subscriberCount={testSubscriberCount}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    )

    const sendButton = await screen.findByRole('button', { name: /enviar alerta/i })
    expect(sendButton).toHaveAttribute('type', 'button')
  })
})
