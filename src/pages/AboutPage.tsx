import { useTranslation } from 'react-i18next'
import { Stack, Box, Heading, Text } from '@mond-design-system/theme'

// Single Responsibility: About page explaining the app's purpose and how it works
export function AboutPage() {
  const { t } = useTranslation()

  return (
    <Box maxWidth="800px" style={{ margin: '0 auto' }}>
      <Stack spacing={6}>
        <Heading level={1} size="lg" textAlign="center">
          {t('about.title')}
        </Heading>

        {/* Mission Section */}
        <Stack spacing={2}>
          <Heading level={2} size="md">
            {t('about.mission.title')}
          </Heading>
          <Text variant="body-md">
            {t('about.mission.text')}
          </Text>
        </Stack>

        {/* How It Works Section */}
        <Stack spacing={2}>
          <Heading level={2} size="md">
            {t('about.howItWorks.title')}
          </Heading>
          <Box as="ol" style={{ paddingLeft: '1.5rem', margin: 0 }}>
            <Text variant="body-md" as="div" style={{ marginBottom: '0.25rem' }}>
              {t('about.howItWorks.step1')}
            </Text>
            <Text variant="body-md" as="div" style={{ marginBottom: '0.25rem' }}>
              {t('about.howItWorks.step2')}
            </Text>
            <Text variant="body-md" as="div" style={{ marginBottom: '0.25rem' }}>
              {t('about.howItWorks.step3')}
            </Text>
            <Text variant="body-md" as="div">
              {t('about.howItWorks.step4')}
            </Text>
          </Box>
        </Stack>

        {/* Privacy Section */}
        <Stack spacing={2}>
          <Heading level={2} size="md">
            {t('about.privacy.title')}
          </Heading>
          <Stack spacing={1}>
            <Text variant="body-md">
              • {t('about.privacy.text1')}
            </Text>
            <Text variant="body-md">
              • {t('about.privacy.text2')}
            </Text>
            <Text variant="body-md">
              • {t('about.privacy.text3')}
            </Text>
          </Stack>
        </Stack>

        {/* Safety Tips Section */}
        <Stack spacing={2}>
          <Heading level={2} size="md">
            {t('about.safety.title')}
          </Heading>
          <Stack spacing={1}>
            <Text variant="body-md">
              • {t('about.safety.tip1')}
            </Text>
            <Text variant="body-md">
              • {t('about.safety.tip2')}
            </Text>
            <Text variant="body-md">
              • {t('about.safety.tip3')}
            </Text>
          </Stack>
        </Stack>

        {/* Legal Disclaimer Section */}
        <Box
          bg="feedback.warning.background"
          borderRadius="8px"
          p={4}
          borderLeft="4px solid"
          borderColor="feedback.warning.border"
        >
          <Stack spacing={2}>
            <Heading level={2} size="md">
              {t('about.legal.title')}
            </Heading>
            <Stack spacing={1}>
              <Text variant="body-sm" weight="semibold">
                • {t('about.legal.text1')}
              </Text>
              <Text variant="body-sm" weight="semibold">
                • {t('about.legal.text2')}
              </Text>
              <Text variant="body-sm" weight="semibold">
                • {t('about.legal.text3')}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
