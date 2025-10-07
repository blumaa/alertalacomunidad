import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stack, Box, Heading, Text } from '@mond-design-system/theme'
import { AlertButton } from '../components/ui/AlertButton'
import { AddressInputBottomSheet } from '../components/ui/AddressInputBottomSheet'
import { ConfirmAlertBottomSheet } from '../components/ui/ConfirmAlertBottomSheet'
import { SubscriberCount } from '../components/ui/SubscriberCount'
import { SignUpForm } from '../components/ui/SignUpForm'
import { LegalDisclaimer } from '../components/ui/LegalDisclaimer'
import { useToast } from '../hooks/useToast'
import { useSubscriberCount } from '../hooks/useSubscriberCount'

// Single Responsibility: Main home page orchestrating alert and sign-up flows
export function HomePage() {
  const { t } = useTranslation()
  const { showSuccess } = useToast()
  const { count } = useSubscriberCount()

  const [showAddressInput, setShowAddressInput] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [address, setAddress] = useState('')

  const handleAlertClick = () => {
    setShowAddressInput(true)
  }

  const handleAddressCancel = () => {
    setShowAddressInput(false)
    setAddress('')
  }

  const handleAddressContinue = (newAddress: string) => {
    setAddress(newAddress)
    setShowAddressInput(false)
    setShowConfirmation(true)
  }

  const handleConfirmationCancel = () => {
    setShowConfirmation(false)
  }

  const handleConfirmationSend = () => {
    // TODO: Call Firebase Function to send alert
    setShowConfirmation(false)
    setAddress('')
    showSuccess(t('toast.alertSent'))
  }

  const handleSignUpSubmit = async (email: string) => {
    // TODO: Call Firebase Function to add subscriber
    console.log('Sign up:', email)
    showSuccess(t('toast.signUpSuccess'))
  }

  return (
    <Box>
      <Stack spacing={6} align="center">
        {/* Alert Section */}
        <Stack spacing={4} align="center" width="100%" maxWidth="600px">
          <Heading level={1} size="lg" textAlign="center">
            {t('alert.button')}
          </Heading>

          <Text variant="body-md" textAlign="center">
            {t('alert.description')}
          </Text>

          <SubscriberCount />

          <AlertButton onClick={handleAlertClick} />

          <LegalDisclaimer />
        </Stack>

        {/* Sign Up Section */}
        <Stack spacing={3} align="stretch" width="100%" maxWidth="400px">
          <Heading level={2} size="md" textAlign="center">
            {t('signUp.title')}
          </Heading>

          <Text variant="body-sm" textAlign="center" semantic="secondary">
            {t('signUp.description')}
          </Text>

          <SignUpForm onSubmit={handleSignUpSubmit} />
        </Stack>
      </Stack>

      {/* Bottom Sheets */}
      <AddressInputBottomSheet
        open={showAddressInput}
        onContinue={handleAddressContinue}
        onCancel={handleAddressCancel}
      />

      <ConfirmAlertBottomSheet
        open={showConfirmation}
        address={address}
        subscriberCount={count}
        onConfirm={handleConfirmationSend}
        onCancel={handleConfirmationCancel}
      />
    </Box>
  )
}
