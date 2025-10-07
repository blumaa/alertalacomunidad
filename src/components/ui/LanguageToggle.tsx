import { type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Switch, Stack, Text } from '@mond-design-system/theme'

// Single Responsibility: Only handles language switching
export function LanguageToggle() {
  const { i18n } = useTranslation()
  const isEnglish = i18n.language === 'en'

  const handleToggle = (value: boolean | ChangeEvent<HTMLInputElement>) => {
    // Handle both boolean and event object
    const checked = typeof value === 'boolean' ? value : value.target.checked
    i18n.changeLanguage(checked ? 'en' : 'es')
  }

  return (
    <Stack direction="horizontal" spacing={2} align="center">
      <Text variant="body-sm" weight={!isEnglish ? 'semibold' : 'normal'}>
        ES
      </Text>
      <Switch
        checked={isEnglish}
        onChange={handleToggle}
        size="sm"
        aria-label="Toggle language"
      />
      <Text variant="body-sm" weight={isEnglish ? 'semibold' : 'normal'}>
        EN
      </Text>
    </Stack>
  )
}
