import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Card, Stack, Input, Button, Text, Heading } from '@mond-design-system/theme'

interface AddressInputBottomSheetProps {
  open: boolean
  onContinue: (address: string) => void
  onCancel: () => void
}

// Single Responsibility: Address input bottom sheet
export function AddressInputBottomSheet({
  open,
  onContinue,
  onCancel,
}: AddressInputBottomSheetProps) {
  const { t } = useTranslation()
  const [address, setAddress] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Clear input when sheet is closed
  useEffect(() => {
    if (!open) {
      setAddress('')
      setError(null)
    }
  }, [open])

  const handleContinue = () => {
    // Validate address
    if (!address.trim()) {
      setError(t('addressInput.addressRequired'))
      return
    }

    onContinue(address)
  }

  const handleAddressChange = (value: string) => {
    setAddress(value)
    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }

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
            {t('addressInput.title')}
          </Heading>

          <Stack spacing={2}>
            <Input
              label={t('addressInput.label')}
              type="text"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder={t('addressInput.placeholder')}
              error={error || undefined}
              required
              aria-required="true"
            />

            <Text variant="body-sm" semantic="secondary">
              {t('addressInput.helperText')}
            </Text>
          </Stack>

          <Stack direction="horizontal" spacing={2} justify="end">
            <Button variant="ghost" size="md" onClick={onCancel}>
              {t('addressInput.cancel')}
            </Button>
            <Button variant="primary" size="md" onClick={handleContinue}>
              {t('addressInput.continue')}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Box>
  )
}
