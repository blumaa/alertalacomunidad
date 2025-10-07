import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import { HomePage } from './HomePage'

// Mock Firebase hooks
vi.mock('../hooks/useSubscriberCount', () => ({
  useSubscriberCount: vi.fn(),
}))

import { useSubscriberCount } from '../hooks/useSubscriberCount'

// TDD: Define expected behavior for HomePage integration
describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    vi.mocked(useSubscriberCount).mockReturnValue({
      count: 150,
      loading: false,
      error: null,
    })
  })

  describe('Layout and Structure', () => {
    it('renders the main alert section', async () => {
      render(<HomePage />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/alerta la comunidad/i)
      })
    })

    it('renders the alert button', async () => {
      render(<HomePage />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /alerta la comunidad/i })).toBeInTheDocument()
      })
    })

    it('renders subscriber count', async () => {
      render(<HomePage />)

      await waitFor(() => {
        expect(screen.getByText(/150/)).toBeInTheDocument()
      })
    })

    it('renders the legal disclaimer', async () => {
      render(<HomePage />)

      await waitFor(() => {
        expect(screen.getByText(/aviso importante/i)).toBeInTheDocument()
      })
    })

    it('renders the sign up section', async () => {
      render(<HomePage />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /registrarse/i })).toBeInTheDocument()
      })
    })
  })

  describe('Alert Flow', () => {
    it('opens address input bottom sheet when alert button is clicked', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      const alertButton = await screen.findByRole('button', { name: /alerta la comunidad/i })
      await user.click(alertButton)

      await waitFor(() => {
        expect(screen.getByText(/ingresa la dirección/i)).toBeInTheDocument()
      })
    })

    it('closes address input when cancel is clicked', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      // Open address input
      const alertButton = await screen.findByRole('button', { name: /alerta la comunidad/i })
      await user.click(alertButton)

      await waitFor(() => {
        expect(screen.getByText(/ingresa la dirección/i)).toBeInTheDocument()
      })

      // Click cancel
      const cancelButton = screen.getByRole('button', { name: /cancelar/i })
      await user.click(cancelButton)

      // Should be closed
      expect(screen.queryByText(/ingresa la dirección/i)).not.toBeInTheDocument()
    })

    it('proceeds to confirmation when address is entered', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      // Open address input
      const alertButton = await screen.findByRole('button', { name: /alerta la comunidad/i })
      await user.click(alertButton)

      // Enter address
      const addressInput = await screen.findByLabelText(/dirección/i)
      await user.type(addressInput, '123 Main St, Chicago')

      // Click continue
      const continueButton = screen.getByRole('button', { name: /continuar/i })
      await user.click(continueButton)

      // Should show confirmation
      await waitFor(() => {
        expect(screen.getByText(/confirmar alerta/i)).toBeInTheDocument()
        expect(screen.getByText('123 Main St, Chicago')).toBeInTheDocument()
      })
    })

    it('shows subscriber count in confirmation', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      // Go through flow to confirmation
      const alertButton = await screen.findByRole('button', { name: /alerta la comunidad/i })
      await user.click(alertButton)

      const addressInput = await screen.findByLabelText(/dirección/i)
      await user.type(addressInput, '123 Main St')

      const continueButton = screen.getByRole('button', { name: /continuar/i })
      await user.click(continueButton)

      // Check subscriber count in confirmation
      await waitFor(() => {
        expect(screen.getByText(/enviar alerta a 150 suscriptores/i)).toBeInTheDocument()
      })
    })

    it('closes confirmation when cancel is clicked', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      // Go to confirmation
      const alertButton = await screen.findByRole('button', { name: /alerta la comunidad/i })
      await user.click(alertButton)

      const addressInput = await screen.findByLabelText(/dirección/i)
      await user.type(addressInput, '123 Main St')

      const continueButton = screen.getByRole('button', { name: /continuar/i })
      await user.click(continueButton)

      await waitFor(() => {
        expect(screen.getByText(/confirmar alerta/i)).toBeInTheDocument()
      })

      // Click cancel in confirmation
      const cancelButtons = screen.getAllByRole('button', { name: /cancelar/i })
      await user.click(cancelButtons[cancelButtons.length - 1])

      // Should be closed
      expect(screen.queryByText(/confirmar alerta/i)).not.toBeInTheDocument()
    })

    it('shows success toast when alert is sent', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      // Go through full flow
      const alertButton = await screen.findByRole('button', { name: /alerta la comunidad/i })
      await user.click(alertButton)

      const addressInput = await screen.findByLabelText(/dirección/i)
      await user.type(addressInput, '123 Main St')

      const continueButton = screen.getByRole('button', { name: /continuar/i })
      await user.click(continueButton)

      await waitFor(() => {
        expect(screen.getByText(/confirmar alerta/i)).toBeInTheDocument()
      })

      // Send alert
      const sendButton = screen.getByRole('button', { name: /enviar alerta/i })
      await user.click(sendButton)

      // Should show success toast
      await waitFor(() => {
        expect(screen.getByText(/alerta enviada exitosamente/i)).toBeInTheDocument()
      })

      // Confirmation should be closed
      expect(screen.queryByText(/confirmar alerta/i)).not.toBeInTheDocument()
    })
  })

  describe('Sign Up Flow', () => {
    it('shows success toast when email is submitted', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      // Find email input
      const emailInput = await screen.findByLabelText(/correo electrónico/i)
      await user.type(emailInput, 'test@example.com')

      // Submit
      const submitButton = screen.getByRole('button', { name: /registrarse/i })
      await user.click(submitButton)

      // Should show success toast
      await waitFor(() => {
        expect(screen.getByText(/registro exitoso.*revisa tu email/i)).toBeInTheDocument()
      })

      // Email should be cleared
      expect(emailInput).toHaveValue('')
    })

    it('shows validation error for invalid email', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      const emailInput = await screen.findByLabelText(/correo electrónico/i)
      await user.type(emailInput, 'invalid-email')

      const submitButton = screen.getByRole('button', { name: /registrarse/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/por favor ingresa un email válido/i)).toBeInTheDocument()
      })
    })

    it('shows validation error for empty email', async () => {
      const user = userEvent.setup()
      render(<HomePage />)

      const submitButton = screen.getByRole('button', { name: /registrarse/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument()
      })
    })
  })

  describe('Loading States', () => {
    it('shows loading state when subscriber count is loading', async () => {
      vi.mocked(useSubscriberCount).mockReturnValue({
        count: 0,
        loading: true,
        error: null,
      })

      render(<HomePage />)

      await waitFor(() => {
        expect(screen.getByText(/\.\.\./)).toBeInTheDocument()
      })
    })

    it('hides subscriber count when there is an error', async () => {
      vi.mocked(useSubscriberCount).mockReturnValue({
        count: 0,
        loading: false,
        error: new Error('Failed to fetch'),
      })

      render(<HomePage />)

      // Should not show subscriber count
      await waitFor(() => {
        expect(screen.queryByText(/personas suscritas/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', async () => {
      render(<HomePage />)

      await waitFor(() => {
        const headings = screen.getAllByRole('heading')
        expect(headings.length).toBeGreaterThan(0)
      })
    })

    it('has proper form labels', async () => {
      render(<HomePage />)

      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /correo electrónico/i })).toBeInTheDocument()
      })
    })
  })
})
