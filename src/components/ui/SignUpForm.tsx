import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Stack, Input, Button } from '@mond-design-system/theme'
import { useEmailValidation } from '../../hooks/useEmailValidation'

interface SignUpFormProps {
  onSubmit: (email: string) => void | Promise<void>
  loading?: boolean
}

// Single Responsibility: Email sign-up form
export function SignUpForm({ onSubmit, loading = false }: SignUpFormProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const { error, validateEmail, clearError } = useEmailValidation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate email
    if (!validateEmail(email)) {
      return
    }

    // Call onSubmit handler
    await onSubmit(email)

    // Clear form on success
    setEmail('')
    clearError()
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    // Clear error when user starts typing
    if (error) {
      clearError()
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={3} align="stretch">
        <Input
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder={t('signUp.emailPlaceholder')}
          error={error || undefined}
          disabled={loading}
          required
          aria-required="true"
          aria-label={t('signUp.emailLabel')}
        />

        <Button
          type="submit"
          variant="outline"
          size="md"
          disabled={loading}
          style={{ width: '100%' }}
        >
          {t('signUp.button')}
        </Button>
      </Stack>
    </form>
  )
}
