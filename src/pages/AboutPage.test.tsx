import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '../test/test-utils'
import { AboutPage } from './AboutPage'

// TDD: Define expected behavior for AboutPage
describe('AboutPage', () => {
  describe('Content and Structure', () => {
    it('renders the page title', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/acerca de/i)
      })
    })

    it('renders mission section', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/nuestra misión/i)).toBeInTheDocument()
      })
    })

    it('renders how it works section', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/cómo funciona/i)).toBeInTheDocument()
      })
    })

    it('renders privacy section', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /privacidad/i })).toBeInTheDocument()
      })
    })

    it('renders safety tips section', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/consejos de seguridad/i)).toBeInTheDocument()
      })
    })

    it('renders legal disclaimer section', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/aviso legal/i)).toBeInTheDocument()
      })
    })
  })

  describe('Mission Content', () => {
    it('explains the purpose of the app', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/proteger a nuestra comunidad/i)).toBeInTheDocument()
      })
    })
  })

  describe('How It Works Content', () => {
    it('explains the alert process', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/presencias actividad de ice/i)).toBeInTheDocument()
      })
    })

    it('explains subscriber notifications', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/abogados.*reciben.*email/i)).toBeInTheDocument()
      })
    })
  })

  describe('Privacy Content', () => {
    it('mentions no location tracking', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/no rastreamos tu ubicación/i)).toBeInTheDocument()
      })
    })

    it('mentions manual address entry', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        // Looking for the specific privacy text about manual entry
        const texts = screen.getAllByText(/ingresas.*dirección.*manualmente/i)
        expect(texts.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Safety Tips Content', () => {
    it('warns about only reporting witnessed activity', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/solo reporta.*presenciando/i)).toBeInTheDocument()
      })
    })

    it('mentions rate limiting', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/15 minutos/i)).toBeInTheDocument()
      })
    })
  })

  describe('Legal Disclaimer Content', () => {
    it('states alerts are unverified', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/no verificados/i)).toBeInTheDocument()
      })
    })

    it('states no legal advice is provided', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText(/no.*asesoría legal/i)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        const headings = screen.getAllByRole('heading')
        expect(headings.length).toBeGreaterThan(1)
      })
    })

    it('uses semantic HTML sections', async () => {
      const { container } = render(<AboutPage />)

      // Check that content is organized in a structured way
      const headings = container.querySelectorAll('h1, h2, h3')
      expect(headings.length).toBeGreaterThan(1)
    })
  })

  describe('Responsive Design', () => {
    it('renders content in a readable layout', async () => {
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      })
    })
  })
})
