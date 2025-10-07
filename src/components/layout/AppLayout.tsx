import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Stack, Heading, Text, Button } from '@mond-design-system/theme'
import { LanguageToggle } from '../ui/LanguageToggle'

// Single Responsibility: Layout structure only
interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation()

  return (
    <Box minHeight="100vh" bg="surface.background">
      {/* Header */}
      <Box
        as="header"
        role="banner"
        bg="surface.primary"
        borderBottom="1px solid"
        borderColor="border.default"
        px={5}
        py={4}
      >
        <Stack direction="vertical" spacing={2} align="center">
          {/* Title and Tagline */}
          <Heading
            level={1}
            size="xl"
            textAlign="center"
          >
            {t('header.title')}
          </Heading>
          <Text
            variant="body-sm"
            weight="semibold"
            textAlign="center"
            semantic="secondary"
          >
            {t('header.tagline')}
          </Text>

          {/* Navigation */}
          <Box width="100%">
            <Stack
              direction="horizontal"
              spacing={2}
              align="center"
              justify="center"
            >
              <Link to="/#sign-up" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="sm">
                  {t('header.signUp')}
                </Button>
              </Link>
              <Link to="/about" style={{ textDecoration: 'none' }}>
                <Button variant="ghost" size="sm">
                  {t('header.about')}
                </Button>
              </Link>
              <LanguageToggle />
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Main Content */}
      <Box as="main" role="main">
        {children}
      </Box>
    </Box>
  )
}
