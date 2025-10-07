import { createContext } from 'react'

export interface ToastContextValue {
  showToast: (message: string, options?: { type: 'success' | 'error' | 'info'; duration?: number }) => void
  showSuccess: (message: string, duration?: number) => void
  showError: (message: string, duration?: number) => void
  showInfo: (message: string, duration?: number) => void
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined)
