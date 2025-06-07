import { describe, it, expect } from 'vitest'
import { formatDateOfBirth, formatDateForSdk } from './formatDate'

describe('Date formatters', () => {
  const testDate = new Date('2000-01-01T00:00:00Z')

  it('formats date of birth', () => {
    const formatted = formatDateOfBirth(testDate)
    expect(formatted).toBe('January 1st, 2000')
  })

  it('formats date for SDK', () => {
    const formatted = formatDateForSdk(testDate)
    expect(formatted).toBe('2000-01-01')
  })
})
