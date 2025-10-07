import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import { AppLayout } from './AppLayout'

// TDD: Define expected behavior through tests
describe('AppLayout', () => {
  it('renders the app title in the header', () => {
    render(
      <AppLayout>
        <div>Test content</div>
      </AppLayout>
    )

    // Spanish is default - use flexible matcher
    expect(screen.getByText(/Alerta La Comunidad/i)).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(
      <AppLayout>
        <div>Test content</div>
      </AppLayout>
    )

    expect(screen.getByText('Contra ICE')).toBeInTheDocument()
  })

  it('renders the sign up button', () => {
    render(
      <AppLayout>
        <div>Test content</div>
      </AppLayout>
    )

    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument()
  })

  it('renders the about link', () => {
    render(
      <AppLayout>
        <div>Test content</div>
      </AppLayout>
    )

    expect(screen.getByRole('link', { name: /acerca de/i })).toBeInTheDocument()
  })

  it('renders the language toggle', () => {
    render(
      <AppLayout>
        <div>Test content</div>
      </AppLayout>
    )

    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <AppLayout>
        <div data-testid="test-child">Test content</div>
      </AppLayout>
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('has semantic HTML structure with header and main', () => {
    const { container } = render(
      <AppLayout>
        <div>Test content</div>
      </AppLayout>
    )

    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('main')).toBeInTheDocument()
  })

  it('has mobile-first responsive layout', () => {
    render(
      <AppLayout>
        <div>Test content</div>
      </AppLayout>
    )

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})
