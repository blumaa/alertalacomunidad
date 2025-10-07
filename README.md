# Alerta La Comunidad (Contra ICE)

A bilingual (Spanish/English) community alert application for reporting ICE activity. Built with React 19, TypeScript, Firebase, and following TDD/SOLID principles.

## Features

- 🚨 **Alert System**: Report ICE activity with address input and 15-minute rate limiting
- 📧 **Email Notifications**: Subscribers receive instant alerts via email
- 🌍 **Bilingual**: Spanish (default) and English support
- 📱 **Mobile-First**: Responsive design optimized for mobile devices
- 🔒 **Privacy-Focused**: No GPS tracking, manual address entry only
- ⚡ **Real-Time**: Live subscriber count updates

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI**: @mond-design-system/theme
- **Backend**: Firebase (Firestore + Functions)
- **Email**: Resend API
- **Testing**: Vitest + Testing Library
- **i18n**: react-i18next

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase CLI: `npm install -g firebase-tools`

### Installation

```bash
# Install dependencies
npm install

# Install Firebase CLI globally (if not already installed)
npm install -g firebase-tools
```

### Running Locally (Development Mode)

The app is configured to use Firebase Emulators for local development. **No Firebase project setup required to start developing!**

1. **Terminal 1 - Start Firebase Emulators:**
```bash
firebase emulators:start
```

This will start:
- Firestore Emulator (port 8080)
- Functions Emulator (port 5001)
- Emulator UI (http://localhost:4000)

2. **Terminal 2 - Start Vite Dev Server:**
```bash
npm run dev
```

3. **Open your browser:**
- App: http://localhost:5173
- Firebase Emulator UI: http://localhost:4000

The app will automatically connect to the local Firebase emulators. You'll see a console message: `🔥 Using Firebase Emulators for local development`

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:ui

# Run linting
npm run lint

# Type checking
npx tsc -b

# Build for production
npm run build
```

### Environment Variables (Optional)

For production deployment, copy `.env.example` to `.env` and add your Firebase config:

```bash
cp .env.example .env
```

Then fill in your Firebase project credentials from the Firebase Console.

## Project Structure

```
src/
├── components/
│   ├── layout/      # Layout components (AppLayout)
│   └── ui/          # Reusable UI components
├── contexts/        # React contexts
├── firebase/        # Firebase configuration
├── hooks/           # Custom React hooks
├── i18n/           # Internationalization
├── pages/          # Page components
├── providers/      # Context providers
└── test/           # Test utilities
```

## Development Principles

- **TDD (Test-Driven Development)**: All features written with tests first
- **SOLID Principles**: Single Responsibility, clean architecture
- **DRY (Don't Repeat Yourself)**: Reusable hooks and components
- **Type Safety**: Strict TypeScript mode enabled

## Available Scripts

- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Firebase Setup (for Production)

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Enable Functions
4. Add your Firebase config to `.env`
5. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

## License

ISC

## Contributing

This project follows strict TDD and SOLID principles. All code must include tests and pass linting before submission.
# alertalacomunidad
