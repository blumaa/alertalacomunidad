import { useState, useCallback, type ReactNode } from 'react'
import { ToastContainer, type ToastData } from '@mond-design-system/theme'
import { ToastContext } from '../contexts/ToastContext'

interface ToastOptions {
  type: 'success' | 'error' | 'info'
  duration?: number
}

interface ToastProviderProps {
  children: ReactNode
}

// Single Responsibility: Provide toast notification context using MDS ToastContainer
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const showToast = useCallback((message: string, options?: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const newToast: ToastData = {
      id,
      type: options?.type || 'info',
      title: message,
      duration: options?.duration ?? 5000,
      dismissible: true,
    }
    setToasts((prev) => [...prev, newToast])
  }, [])

  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      showToast(message, { type: 'success', duration })
    },
    [showToast]
  )

  const showError = useCallback(
    (message: string, duration?: number) => {
      showToast(message, { type: 'error', duration })
    },
    [showToast]
  )

  const showInfo = useCallback(
    (message: string, duration?: number) => {
      showToast(message, { type: 'info', duration })
    },
    [showToast]
  )

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showInfo }}>
      {children}
      <ToastContainer
        position="top-right"
        toasts={toasts}
        onDismiss={dismissToast}
      />
    </ToastContext.Provider>
  )
}
