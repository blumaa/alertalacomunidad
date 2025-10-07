import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, Stack, Text } from '@mond-design-system/theme'

// Single Responsibility: Display legal disclaimer only
export function LegalDisclaimer() {
  const { t } = useTranslation()

  return (
    <Card
      variant="outlined"
      p={4}
      role="note"
      aria-label="Legal disclaimer"
      bg="feedback.warning.background"
      borderColor="feedback.warning.border"
    >
      <Stack spacing={2}>
        <Text variant="body-sm" weight="bold" semantic="warning">
          ⚠️ {t('disclaimer.title')}
        </Text>
        <Text variant="body-sm">
          {t('disclaimer.text')}
        </Text>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <Text variant="body-sm" weight="semibold" color="interactive.primary">
            {t('disclaimer.link')} →
          </Text>
        </Link>
      </Stack>
    </Card>
  )
}
