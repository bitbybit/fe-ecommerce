import { z } from 'zod'

export const emailRule = z.string().min(1, 'Email is required.').email()

export const passwordRule = z
  .string()
  .min(8, {
    message: 'Password must contain at least 8 character.'
  })
  .refine((value) => new RegExp(/[A-Z]/).exec(value) !== null, {
    message: 'Password must include at least 1 uppercase letter.'
  })
  .refine((value) => new RegExp(/[a-z]/).exec(value) !== null, {
    message: 'Password must include at least 1 lowercase letter.'
  })
  .refine((value) => new RegExp(/\d/).exec(value) !== null, {
    message: 'Password must include at least 1 number.'
  })
  .refine((value) => new RegExp(/[A-z\d\-_!]/).exec(value) !== null, {
    message: 'Allowed password characters are: A-z0-9-_!'
  })

export const firstNameRule = z
  .string()
  .min(1, {
    message: 'First name must contain at least one character.'
  })
  .refine((value) => new RegExp(/[A-z]/).exec(value) !== null, {
    message: 'Allowed first name characters are: A-z'
  })

export const lastNameRule = z
  .string()
  .min(1, {
    message: 'Last name must contain at least one character.'
  })
  .refine((value) => new RegExp(/[A-z]/).exec(value) !== null, {
    message: 'Allowed last name characters are: A-z'
  })

export const dateOfBirthRule = z
  .string()
  .date()
  .refine(
    (value) => {
      const dateOfBirth = new Date(value)

      if (Number.isNaN(dateOfBirth)) {
        return false
      }

      const today = new Date()
      let age = today.getFullYear() - dateOfBirth.getFullYear()
      const monthDiff = today.getMonth() - dateOfBirth.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
        age -= 1
      }

      return age >= 13
    },
    {
      message: 'You must be at least 13 years old.'
    }
  )

export const streetNameRule = z.string().min(1, {
  message: 'Street must contain at least one character.'
})

export const cityRule = z
  .string()
  .min(1, {
    message: 'City must contain at least one character.'
  })
  .refine((value) => new RegExp(/[A-z]/).exec(value) !== null, {
    message: 'Allowed city characters are: A-z'
  })

// TODO: implement
export const countryRule = z.string()

// TODO: implement
export const postalCodeRule = z.string()
