import { useState, useEffect, useCallback } from 'react'

const RATE_LIMIT_MS = 15 * 60 * 1000 // 15 minutes
const STORAGE_KEY = 'alerta_last_alert_time'

// Single Responsibility: Rate limiting logic
export function useRateLimit() {
  const [lastAlertTime, setLastAlertTime] = useState<number | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? parseInt(stored, 10) : null
  })
  const [timeRemaining, setTimeRemaining] = useState<number>(0)

  // Calculate time remaining until rate limit expires
  const calculateTimeRemaining = useCallback(() => {
    if (!lastAlertTime) return 0

    const now = Date.now()
    const elapsed = now - lastAlertTime
    const remaining = RATE_LIMIT_MS - elapsed

    return remaining > 0 ? remaining : 0
  }, [lastAlertTime])

  // Update time remaining every second
  useEffect(() => {
    const updateTimer = () => {
      const remaining = calculateTimeRemaining()
      setTimeRemaining(remaining)
    }

    // Initial update
    updateTimer()

    // Update every second
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [calculateTimeRemaining])

  // Record a new alert time
  const recordAlert = useCallback(() => {
    const now = Date.now()
    setLastAlertTime(now)
    localStorage.setItem(STORAGE_KEY, now.toString())
  }, [])

  // Check if rate limited
  const isRateLimited = timeRemaining > 0

  // Format time remaining as human-readable string
  const formatTimeRemaining = useCallback(() => {
    const minutes = Math.ceil(timeRemaining / 60000)
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`
  }, [timeRemaining])

  return {
    isRateLimited,
    timeRemaining,
    formatTimeRemaining,
    recordAlert,
  }
}
