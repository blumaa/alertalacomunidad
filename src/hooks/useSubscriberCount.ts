import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

// Single Responsibility: Fetch subscriber count from Firestore
export function useSubscriberCount() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      // Query for confirmed subscribers only
      const q = query(
        collection(db, 'subscribers'),
        where('confirmed', '==', true)
      )

      // Real-time listener
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          setCount(snapshot.size)
          setLoading(false)
        },
        (err) => {
          console.error('Error fetching subscriber count:', err)
          setError(err as Error)
          setLoading(false)
        }
      )

      return unsubscribe
    } catch (err) {
      setError(err as Error)
      setLoading(false)
      return () => {}
    }
  }, [])

  return { count, loading, error }
}
