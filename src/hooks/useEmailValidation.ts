import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// Single Responsibility: Email validation logic
export function useEmailValidation() {
  const { t } = useTranslation()
  const [error, setError] = useState<string | null>(null)

  const validateEmail = (email: string): boolean => {
    // Clear previous error
    setError(null)

    // Check if empty
    if (!email.trim()) {
      setError(t('signUp.emailRequired'))
      return false
    }

    // RFC 5322 compliant email regex (simplified)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setError(t('signUp.invalidEmail'))
      return false
    }

    return true
  }

  const clearError = () => setError(null)

  return { error, validateEmail, clearError }
}
