import { useTranslation } from 'react-i18next'
import { Box, Card, Stack, Button, Text, Heading } from '@mond-design-system/theme'

interface ConfirmAlertBottomSheetProps {
  open: boolean
  address: string
  subscriberCount: number
  onConfirm: () => void
  onCancel: () => void
}

// Single Responsibility: Confirm alert bottom sheet
export function ConfirmAlertBottomSheet({
  open,
  address,
  subscriberCount,
  onConfirm,
  onCancel,
}: ConfirmAlertBottomSheetProps) {
  const { t } = useTranslation()

  if (!open) return null

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.5)"
      display="flex"
      alignItems="end"
      zIndex={1000}
    >
      <Card width="100%" borderRadius="16px 16px 0 0" p={4}>
        <Stack spacing={4}>
          <Heading level={2} size="md">
            {t('confirmation.title')}
          </Heading>

          <Text variant="body-md" weight="semibold">
            {t('confirmation.question', { count: subscriberCount })}
          </Text>

          <Stack spacing={1}>
            <Text variant="body-sm" weight="semibold" semantic="secondary">
              {t('confirmation.location')}
            </Text>
            <Text variant="body-md">{address}</Text>
          </Stack>

          <Box
            bg="feedback.warning.background"
            borderRadius="8px"
            p={3}
            borderLeft="4px solid"
            borderColor="feedback.warning.border"
          >
            <Text variant="body-sm" weight="semibold">
              {t('confirmation.reminder')}
            </Text>
          </Box>

          <Stack direction="horizontal" spacing={2} justify="end">
            <Button variant="ghost" size="md" onClick={onCancel}>
              {t('confirmation.cancel')}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={onConfirm}
            >
              {t('confirmation.send')}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Box>
  )
}
