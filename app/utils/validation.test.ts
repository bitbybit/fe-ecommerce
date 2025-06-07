import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import {
  emailRule,
  passwordRule,
  firstNameRule,
  lastNameRule,
  dateOfBirthRule,
  cityRule,
  withCountryPostalCodeRule
} from './validation'

describe('email validation rules', () => {
  it('accepts valid email', () => {
    expect(() => emailRule.parse('user@example.com')).not.toThrow()
  })

  it('rejects empty string', () => {
    expect(() => emailRule.parse('')).toThrow('Email is required.')
  })

  it('rejects invalid email', () => {
    expect(() => emailRule.parse('not-an-email')).toThrow()
  })
})

describe('password validation rules', () => {
  it('accepts valid password', () => {
    expect(() => passwordRule.parse('Abcdefg1!')).not.toThrow()
  })

  it('rejects password with less than 8 characters', () => {
    expect(() => passwordRule.parse('Ab1!')).toThrow('Password must contain at least 8 character.')
  })

  it('rejects password with spaces', () => {
    expect(() => passwordRule.parse('Abc def1')).toThrow('Password must not contain spaces.')
  })

  it('rejects password without uppercase', () => {
    expect(() => passwordRule.parse('abcdefg1!')).toThrow('Password must include at least 1 uppercase letter.')
  })

  it('rejects password without lowercase', () => {
    expect(() => passwordRule.parse('ABCDEFG1!')).toThrow('Password must include at least 1 lowercase letter.')
  })

  it('rejects password without number', () => {
    expect(() => passwordRule.parse('Abcdefgh!')).toThrow('Password must include at least 1 number.')
  })

  it('rejects password with invalid characters', () => {
    expect(() => passwordRule.parse('Abcdefg1@')).toThrowError(/Allowed password characters are/)
  })
})

describe('date of birth rules', () => {
  it('accepts a date where user is 13 or older', () => {
    const thirteenYearsAgo = new Date()
    thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13)
    expect(() => dateOfBirthRule.parse(thirteenYearsAgo)).not.toThrow()
  })

  it('rejects date where user is under 13', () => {
    const recentDate = new Date()
    recentDate.setFullYear(recentDate.getFullYear() - 10)
    expect(() => dateOfBirthRule.parse(recentDate)).toThrow('You must be at least 13 years old.')
  })

  it('rejects invalid date input', () => {
    expect(() => dateOfBirthRule.parse(new Date('invalid-date'))).toThrow()
  })
})

describe('country postal code rules', () => {
  const schema = withCountryPostalCodeRule(
    z.object({
      country: z.string(),
      postalCode: z.string()
    })
  )

  it('accepts valid postal code for valid country', () => {
    expect(() =>
      schema.parse({
        country: 'US',
        postalCode: '90210'
      })
    ).not.toThrow()
  })

  it('rejects invalid postal code for country', () => {
    const result = schema.safeParse({
      country: 'US',
      postalCode: 'INVALID'
    })

    expect(result.success).toBe(false)
    expect(result.error?.format().postalCode?._errors[0]).toBe('Invalid postal code for country "US"')
  })

  it('passes if country has no postal validation available', () => {
    expect(() =>
      schema.parse({
        country: 'ZZ',
        postalCode: 'ANYTHING'
      })
    ).not.toThrow()
  })
})

describe('first name rules', () => {
  it('accepts valid name', () => {
    expect(() => firstNameRule.parse('John')).not.toThrow()
  })

  it('rejects empty name', () => {
    expect(() => firstNameRule.parse('')).toThrow()
  })

  it('rejects non-letter name', () => {
    expect(() => firstNameRule.parse('123')).toThrow()
  })
})

describe('last name rules', () => {
  it('accepts valid name', () => {
    expect(() => lastNameRule.parse('Smith')).not.toThrow()
  })

  it('rejects empty name', () => {
    expect(() => lastNameRule.parse('')).toThrow()
  })

  it('rejects non-letter name', () => {
    expect(() => lastNameRule.parse('123')).toThrow()
  })
})

describe('city rules', () => {
  it('accepts valid name', () => {
    expect(() => cityRule.parse('New York')).not.toThrow()
  })

  it('rejects empty city', () => {
    expect(() => cityRule.parse('')).toThrow()
  })

  it('rejects non-letter city', () => {
    expect(() => cityRule.parse('123')).toThrow()
  })
})
