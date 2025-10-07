import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Test i18n instance (DRY - reusable across all tests)
i18n
  .use(initReactI18next)
  .init({
    lng: 'es',
    fallbackLng: 'es',
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: {
          // Add test translations here as needed
          header: {
            title: 'Alerta La Comunidad',
            tagline: 'Contra ICE',
            signUp: 'Registrarse',
            about: 'Acerca de',
          },
          disclaimer: {
            title: 'AVISO IMPORTANTE',
            text: 'Las alertas se basan en reportes de la comunidad no verificados. Esta aplicación no provee asesoría legal.',
            link: 'Más información',
          },
          alert: {
            button: 'Alerta La Comunidad',
            description: '¿Presenciaste actividad de ICE? Haz clic para enviar una alerta con la ubicación a abogados y miembros de la comunidad que pueden ayudar.',
            subscriberCount: '{{count}} personas suscritas',
          },
          signUp: {
            title: 'REGISTRARSE',
            description: '¿Eres abogado o miembro de la comunidad que quiere ayudar? Regístrate para recibir alertas por correo electrónico cuando alguien reporte actividad de ICE. Cada alerta incluirá la dirección del incidente.',
            emailLabel: 'Correo Electrónico',
            emailPlaceholder: 'tu@email.com',
            button: 'Registrarse',
            emailRequired: 'El email es requerido',
            invalidEmail: 'Por favor ingresa un email válido',
          },
          countdown: {
            nextAlert: 'Próxima alerta disponible en {{time}}',
          },
          addressInput: {
            title: 'Ingresa la dirección',
            label: 'Dirección',
            placeholder: 'Ej: 123 Main St esquina Oak Ave, Chicago',
            helperText: 'Sé lo más específico posible (dirección, esquina, punto de referencia)',
            addressRequired: 'La dirección es requerida',
            cancel: 'Cancelar',
            continue: 'Continuar',
          },
          confirmation: {
            title: 'Confirmar Alerta',
            question: '¿Enviar alerta a {{count}} suscriptores?',
            question_one: '¿Enviar alerta a {{count}} suscriptor?',
            location: 'Ubicación',
            reminder: 'Recuerda: Solo reporta actividad que realmente estás presenciando.',
            cancel: 'Cancelar',
            send: 'Enviar Alerta',
          },
          toast: {
            close: 'Cerrar',
            alertSent: 'Alerta enviada exitosamente',
            signUpSuccess: 'Registro exitoso. Revisa tu email para confirmar.',
          },
          about: {
            title: 'Acerca De',
            mission: {
              title: 'Nuestra Misión',
              text: 'Proteger a nuestra comunidad mediante alertas rápidas y coordinadas cuando se reporta actividad de ICE.',
            },
            howItWorks: {
              title: 'Cómo Funciona',
              step1: 'Cuando presencias actividad de ICE, haz clic en el botón de alerta.',
              step2: 'Ingresas la dirección manualmente del incidente.',
              step3: 'Abogados y miembros de la comunidad reciben un email con la ubicación.',
              step4: 'Pueden responder rápidamente para ayudar.',
            },
            privacy: {
              title: 'Privacidad',
              text1: 'No rastreamos tu ubicación automáticamente.',
              text2: 'Ingresas la dirección manualmente para mantener tu privacidad.',
              text3: 'No guardamos información personal sobre quién envía alertas.',
            },
            safety: {
              title: 'Consejos de Seguridad',
              tip1: 'Solo reporta actividad que realmente estás presenciando.',
              tip2: 'Sé específico con la dirección para ayudar a los respondedores.',
              tip3: 'Hay un límite de una alerta cada 15 minutos para prevenir spam.',
            },
            legal: {
              title: 'Aviso Legal',
              text1: 'Las alertas se basan en reportes de la comunidad no verificados.',
              text2: 'Esta aplicación no provee asesoría legal.',
              text3: 'Úsala como una herramienta de comunicación comunitaria.',
            },
          },
        },
      },
      en: {
        translation: {
          header: {
            title: 'Alert the Community',
            tagline: 'Against ICE',
            signUp: 'Sign Up',
            about: 'About',
          },
          disclaimer: {
            title: 'IMPORTANT NOTICE',
            text: 'Alerts are based on unverified community reports. This app does not provide legal advice.',
            link: 'More information',
          },
          alert: {
            button: 'Alert the Community',
            description: 'Witnessed ICE activity? Click to send an alert with the location to lawyers and community members who can help.',
            subscriberCount: '{{count}} people subscribed',
          },
          signUp: {
            title: 'SIGN UP',
            description: 'Are you a lawyer or community member who wants to help? Sign up to receive email alerts when someone reports ICE activity. Each alert will include the incident address.',
            emailLabel: 'Email Address',
            emailPlaceholder: 'your@email.com',
            button: 'Sign Up',
            emailRequired: 'Email is required',
            invalidEmail: 'Please enter a valid email',
          },
          countdown: {
            nextAlert: 'Next alert available in {{time}}',
          },
          addressInput: {
            title: 'Enter address',
            label: 'Address',
            placeholder: 'Ex: 123 Main St at Oak Ave, Chicago',
            helperText: 'Be as specific as possible (address, cross street, landmark)',
            addressRequired: 'Address is required',
            cancel: 'Cancel',
            continue: 'Continue',
          },
          confirmation: {
            title: 'Confirm Alert',
            question: 'Send alert to {{count}} subscribers?',
            question_one: 'Send alert to {{count}} subscriber?',
            location: 'Location',
            reminder: 'Remember: Only report activity you are actually witnessing.',
            cancel: 'Cancel',
            send: 'Send Alert',
          },
          toast: {
            close: 'Close',
            alertSent: 'Alert sent successfully',
            signUpSuccess: 'Sign up successful. Check your email to confirm.',
          },
          about: {
            title: 'About',
            mission: {
              title: 'Our Mission',
              text: 'Protect our community through rapid, coordinated alerts when ICE activity is reported.',
            },
            howItWorks: {
              title: 'How It Works',
              step1: 'When you witness ICE activity, click the alert button.',
              step2: 'You manually enter the address of the incident.',
              step3: 'Lawyers and community members receive an email with the location.',
              step4: 'They can respond quickly to help.',
            },
            privacy: {
              title: 'Privacy',
              text1: 'We do not automatically track your location.',
              text2: 'You manually enter the address to maintain your privacy.',
              text3: 'We do not store personal information about who sends alerts.',
            },
            safety: {
              title: 'Safety Tips',
              tip1: 'Only report activity you are actually witnessing.',
              tip2: 'Be specific with the address to help responders.',
              tip3: 'There is a limit of one alert every 15 minutes to prevent spam.',
            },
            legal: {
              title: 'Legal Notice',
              text1: 'Alerts are based on unverified community reports.',
              text2: 'This application does not provide legal advice.',
              text3: 'Use it as a community communication tool.',
            },
          },
        },
      },
    },
  })

export default i18n
