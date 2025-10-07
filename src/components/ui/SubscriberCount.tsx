import { useTranslation } from 'react-i18next'
import { Text } from '@mond-design-system/theme'
import { useSubscriberCount } from '../../hooks/useSubscriberCount'

// Single Responsibility: Display subscriber count
export function SubscriberCount() {
  const { t } = useTranslation()
  const { count, loading, error } = useSubscriberCount()

  if (loading) {
    return (
      <Text variant="body-sm" weight="semibold" textAlign="center">
        ...
      </Text>
    )
  }

  if (error || count === 0) {
    return null // Silent failure - don't show error to user, or hide when count is 0
  }

  // Format number with commas
  const formattedCount = count.toLocaleString()

  return (
    <Text variant="body-sm" weight="semibold" textAlign="center">
      {formattedCount} {t('alert.subscriberCount').replace('{{count}}', '')}
    </Text>
  )
}
