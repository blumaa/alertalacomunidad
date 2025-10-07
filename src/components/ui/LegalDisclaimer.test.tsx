import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import { LegalDisclaimer } from './LegalDisclaimer'

// TDD: Define expected behavior
describe('LegalDisclaimer', () => {
  it('renders the disclaimer title', () => {
    render(<LegalDisclaimer />)

    expect(screen.getByText(/AVISO IMPORTANTE/i)).toBeInTheDocument()
  })

  it('renders the disclaimer text', () => {
    render(<LegalDisclaimer />)

    expect(screen.getByText(/Las alertas se basan en reportes de la comunidad no verificados/i)).toBeInTheDocument()
  })

  it('renders a link to more information', () => {
    render(<LegalDisclaimer />)

    const link = screen.getByText(/Más información/i)
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/about')
  })

  it('has appropriate visual styling to draw attention', () => {
    render(<LegalDisclaimer />)

    // Should have warning indicator
    expect(screen.getByText(/⚠️/)).toBeInTheDocument()
  })

  it('is accessible with proper ARIA attributes', () => {
    render(<LegalDisclaimer />)

    // Disclaimer should have role alert or note for screen readers
    const disclaimer = screen.getByRole('note')
    expect(disclaimer).toBeInTheDocument()
  })
})
