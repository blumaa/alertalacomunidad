import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, render, screen, waitFor } from '../test/test-utils'
import { ToastProvider } from './ToastProvider'
import { useToast } from '../hooks/useToast'
import { type ReactNode } from 'react'

// TDD: Define expected behavior for ToastProvider and useToast hook
describe('ToastProvider and useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const wrapper = ({ children }: { children: ReactNode }) => (
    <ToastProvider>{children}</ToastProvider>
  )

  describe('useToast hook', () => {
    it('provides showToast function', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      expect(result.current.showToast).toBeDefined()
      expect(typeof result.current.showToast).toBe('function')
    })

    it('provides showSuccess function', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      expect(result.current.showSuccess).toBeDefined()
      expect(typeof result.current.showSuccess).toBe('function')
    })

    it('provides showError function', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      expect(result.current.showError).toBeDefined()
      expect(typeof result.current.showError).toBe('function')
    })

    it('provides showInfo function', () => {
      const { result } = renderHook(() => useToast(), { wrapper })

      expect(result.current.showInfo).toBeDefined()
      expect(typeof result.current.showInfo).toBe('function')
    })

    it('throws error when used outside ToastProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        renderHook(() => useToast())
      }).toThrow('useToast must be used within ToastProvider')

      consoleSpy.mockRestore()
    })
  })

  describe('showSuccess', () => {
    it('displays success toast', () => {
      const TestComponent = () => {
        const { showSuccess } = useToast()
        return (
          <button onClick={() => showSuccess('Operation successful')}>
            Show Success
          </button>
        )
      }

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      const button = screen.getByRole('button', { name: /show success/i })
      act(() => {
        button.click()
      })

      expect(screen.getByText('Operation successful')).toBeInTheDocument()
    })
  })

  describe('showError', () => {
    it('displays error toast', () => {
      const TestComponent = () => {
        const { showError } = useToast()
        return (
          <button onClick={() => showError('Operation failed')}>
            Show Error
          </button>
        )
      }

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      const button = screen.getByRole('button', { name: /show error/i })
      act(() => {
        button.click()
      })

      expect(screen.getByText('Operation failed')).toBeInTheDocument()
    })
  })

  describe('showInfo', () => {
    it('displays info toast', () => {
      const TestComponent = () => {
        const { showInfo } = useToast()
        return (
          <button onClick={() => showInfo('Information message')}>
            Show Info
          </button>
        )
      }

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      const button = screen.getByRole('button', { name: /show info/i })
      act(() => {
        button.click()
      })

      expect(screen.getByText('Information message')).toBeInTheDocument()
    })
  })

  describe('showToast with custom options', () => {
    it('displays toast with custom duration', () => {
      const TestComponent = () => {
        const { showToast } = useToast()
        return (
          <button
            onClick={() =>
              showToast('Custom duration', { type: 'success', duration: 3000 })
            }
          >
            Show Custom
          </button>
        )
      }

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      const button = screen.getByRole('button', { name: /show custom/i })
      act(() => {
        button.click()
      })

      expect(screen.getByText('Custom duration')).toBeInTheDocument()

      // Should still be there after 2 seconds
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      expect(screen.getByText('Custom duration')).toBeInTheDocument()

      // Should be gone after 3 seconds
      act(() => {
        vi.advanceTimersByTime(1000)
      })

      waitFor(() => {
        expect(screen.queryByText('Custom duration')).not.toBeInTheDocument()
      })
    })
  })

  describe('multiple toasts', () => {
    it('displays multiple toasts at once', () => {
      const TestComponent = () => {
        const { showSuccess, showError, showInfo } = useToast()
        return (
          <div>
            <button onClick={() => showSuccess('Success 1')}>Success</button>
            <button onClick={() => showError('Error 1')}>Error</button>
            <button onClick={() => showInfo('Info 1')}>Info</button>
          </div>
        )
      }

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      act(() => {
        screen.getByRole('button', { name: /^success$/i }).click()
        screen.getByRole('button', { name: /^error$/i }).click()
        screen.getByRole('button', { name: /^info$/i }).click()
      })

      expect(screen.getByText('Success 1')).toBeInTheDocument()
      expect(screen.getByText('Error 1')).toBeInTheDocument()
      expect(screen.getByText('Info 1')).toBeInTheDocument()
    })

    it('removes individual toasts when dismissed', () => {
      const TestComponent = () => {
        const { showSuccess } = useToast()
        return (
          <button
            onClick={() => {
              showSuccess('Toast 1')
              showSuccess('Toast 2')
            }}
          >
            Show Toasts
          </button>
        )
      }

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      act(() => {
        screen.getByRole('button', { name: /show toasts/i }).click()
      })

      expect(screen.getByText('Toast 1')).toBeInTheDocument()
      expect(screen.getByText('Toast 2')).toBeInTheDocument()

      // Find close buttons - MDS toast has dismiss buttons
      const closeButtons = screen.getAllByRole('button', { name: /dismiss|close/i })
      act(() => {
        closeButtons[0].click()
      })

      waitFor(() => {
        expect(screen.queryByText('Toast 1')).not.toBeInTheDocument()
        expect(screen.getByText('Toast 2')).toBeInTheDocument()
      })
    })
  })

  describe('toast container', () => {
    it('renders toast container when toasts are shown', () => {
      const TestComponent = () => {
        const { showSuccess } = useToast()
        return (
          <button onClick={() => showSuccess('Test toast')}>Show Toast</button>
        )
      }

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      act(() => {
        screen.getByRole('button', { name: /show toast/i }).click()
      })

      // Check that the toast is rendered
      expect(screen.getByText('Test toast')).toBeInTheDocument()
    })
  })
})
