import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useSubscriberCount } from './useSubscriberCount'

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  onSnapshot: vi.fn((_q, callback) => {
    // Simulate snapshot with confirmed subscribers
    const mockSnapshot = {
      size: 150,
      docs: [],
    }
    callback(mockSnapshot)
    return vi.fn() // unsubscribe function
  }),
}))

// TDD: Test the behavior first
describe('useSubscriberCount', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    // Reset to default mock implementation
    const { onSnapshot } = await import('firebase/firestore')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(vi.mocked(onSnapshot) as any).mockImplementation((_q: any, callback: any) => {
      // Simulate snapshot with confirmed subscribers
      const mockSnapshot = {
        size: 150,
        docs: [],
      }
      callback(mockSnapshot)
      return vi.fn() // unsubscribe function
    })
  })

  it('returns loading state initially', async () => {
    // Mock onSnapshot to NOT call callback immediately
    const { onSnapshot } = await import('firebase/firestore')
    vi.mocked(onSnapshot).mockImplementation(() => vi.fn())

    const { result } = renderHook(() => useSubscriberCount())

    expect(result.current.loading).toBe(true)
    expect(result.current.count).toBe(0)
  })

  it('returns subscriber count after loading', async () => {
    const { result } = renderHook(() => useSubscriberCount())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.count).toBe(150)
  })

  it('handles errors gracefully', async () => {
    // Mock error
    const { onSnapshot } = await import('firebase/firestore')
    vi.mocked(onSnapshot).mockImplementation(() => {
      throw new Error('Firestore error')
    })

    const { result } = renderHook(() => useSubscriberCount())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBeTruthy()
    expect(result.current.count).toBe(0)
  })

  it('unsubscribes on unmount', async () => {
    const unsubscribe = vi.fn()
    const { onSnapshot } = await import('firebase/firestore')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(vi.mocked(onSnapshot) as any).mockImplementation((_q: any, callback: any) => {
      // Call callback immediately to complete loading
      const mockSnapshot = { size: 150, docs: [] }
      callback(mockSnapshot)
      return unsubscribe
    })

    const { unmount } = renderHook(() => useSubscriberCount())

    unmount()

    expect(unsubscribe).toHaveBeenCalled()
  })
})
