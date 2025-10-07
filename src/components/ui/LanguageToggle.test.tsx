import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test/test-utils'
import { LanguageToggle } from './LanguageToggle'
import userEvent from '@testing-library/user-event'
import { useTranslation } from 'react-i18next'
import i18n from '../../test/i18n-test'

// TDD: Write tests first to define behavior
describe('LanguageToggle', () => {
  beforeEach(async () => {
    // Reset language to Spanish before each test
    await i18n.changeLanguage('es')
  })

  it('renders language toggle with ES and EN labels', () => {
    render(<LanguageToggle />)

    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('shows ES as active by default (switch unchecked)', () => {
    render(<LanguageToggle />)

    const switchElement = screen.getByRole('checkbox')
    expect(switchElement).not.toBeChecked()
  })

  it('switches to English when toggle is clicked', async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const { i18n } = useTranslation()
      return (
        <>
          <LanguageToggle />
          <div data-testid="current-lang">{i18n.language}</div>
        </>
      )
    }

    render(<TestComponent />)

    const switchElement = screen.getByRole('checkbox')
    await user.click(switchElement)

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
    expect(switchElement).toBeChecked()
  })

  it('switches back to Spanish when toggle is clicked again', async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const { i18n } = useTranslation()
      return (
        <>
          <LanguageToggle />
          <div data-testid="current-lang">{i18n.language}</div>
        </>
      )
    }

    render(<TestComponent />)

    const switchElement = screen.getByRole('checkbox')

    // Switch to EN
    await user.click(switchElement)
    await waitFor(() => {
      expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
      expect(switchElement).toBeChecked()
    })

    // Switch back to ES
    await user.click(switchElement)
    await waitFor(() => {
      expect(screen.getByTestId('current-lang')).toHaveTextContent('es')
      expect(switchElement).not.toBeChecked()
    })
  })

  it('updates switch checked state when language changes', async () => {
    const user = userEvent.setup()
    render(<LanguageToggle />)

    const switchElement = screen.getByRole('checkbox')

    // Initially unchecked (ES)
    expect(switchElement).not.toBeChecked()

    // Click to switch to EN
    await user.click(switchElement)
    expect(switchElement).toBeChecked()
  })

  it('is keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<LanguageToggle />)

    const switchElement = screen.getByRole('checkbox')

    // Tab to switch
    await user.tab()
    expect(switchElement).toHaveFocus()

    // Press space to toggle
    await user.keyboard(' ')
    await waitFor(() => {
      expect(switchElement).toBeChecked()
    })
  })
})
