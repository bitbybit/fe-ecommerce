import { describe, it, expect } from 'vitest'
import { formatProductItemPrice } from './formatPrice'

describe('Price formatter', () => {
  it('formats a valid cent amount into dollars', () => {
    expect(formatProductItemPrice(2500)).toBe('$25')
    expect(formatProductItemPrice(199)).toBe('$1.99')
    expect(formatProductItemPrice(100)).toBe('$1')
  })

  it('returns "N/A" if centAmount is 0', () => {
    expect(formatProductItemPrice(0)).toBe('N/A')
  })

  it('returns "N/A" if centAmount is undefined', () => {
    expect(formatProductItemPrice()).toBe('N/A')
  })
})
