import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mond-design-system/theme'
import './i18n/config'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ToastProvider } from './providers/ToastProvider'

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
