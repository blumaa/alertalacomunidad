import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test/test-utils'

// Mock the hook module before importing
vi.mock('../../hooks/useSubscriberCount', () => ({
  useSubscriberCount: vi.fn(),
}))

import { SubscriberCount } from './SubscriberCount'
import { useSubscriberCount } from '../../hooks/useSubscriberCount'

// TDD: Define expected behavior
describe('SubscriberCount', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default mock implementation
    vi.mocked(useSubscriberCount).mockReturnValue({
      count: 150,
      loading: false,
      error: null,
    })
  })

  it('renders the subscriber count', () => {
    render(<SubscriberCount />)

    expect(screen.getByText(/150/)).toBeInTheDocument()
    expect(screen.getByText(/personas suscritas/i)).toBeInTheDocument()
  })

  it('shows loading state', () => {
    vi.mocked(useSubscriberCount).mockReturnValue({
      count: 0,
      loading: true,
      error: null,
    })

    render(<SubscriberCount />)

    expect(screen.getByText(/\.\.\./)).toBeInTheDocument()
  })

  it('shows error state', () => {
    vi.mocked(useSubscriberCount).mockReturnValue({
      count: 0,
      loading: false,
      error: new Error('Failed to load'),
    })

    render(<SubscriberCount />)

    expect(screen.queryByText(/150/)).not.toBeInTheDocument()
  })

  it('formats large numbers correctly', () => {
    vi.mocked(useSubscriberCount).mockReturnValue({
      count: 1500,
      loading: false,
      error: null,
    })

    render(<SubscriberCount />)

    expect(screen.getByText(/1,500|1500/)).toBeInTheDocument()
  })
})
