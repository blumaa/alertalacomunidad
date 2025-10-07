import { useTranslation } from 'react-i18next'
import { Button, Stack, Text } from '@mond-design-system/theme'
import { useRateLimit } from '../../hooks/useRateLimit'

interface AlertButtonProps {
  onClick: () => void
}

// Single Responsibility: Alert button with rate limiting
export function AlertButton({ onClick }: AlertButtonProps) {
  const { t } = useTranslation()
  const { isRateLimited, formatTimeRemaining, recordAlert } = useRateLimit()

  const handleClick = () => {
    if (isRateLimited) return

    recordAlert()
    onClick()
  }

  if (isRateLimited) {
    return (
      <Stack spacing={2} align="center">
        <Button
          type="button"
          variant="primary"
          size="lg"
          disabled
          aria-label="Alert button disabled due to cooldown"
        >
          {t('alert.button')}
        </Button>
        <Text variant="body-sm" textAlign="center" semantic="secondary">
          {t('countdown.nextAlert', { time: formatTimeRemaining() })}
        </Text>
      </Stack>
    )
  }

  return (
    <Button
      type="button"
      variant="primary"
      size="lg"
      onClick={handleClick}
      style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
    >
      {t('alert.button')}
    </Button>
  )
}
