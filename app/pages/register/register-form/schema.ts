import { z } from 'zod'
import {
  cityRule,
  countryRule,
  dateOfBirthRule,
  emailRule,
  firstNameRule,
  lastNameRule,
  passwordRule,
  postalCodeRule,
  streetNameRule
} from '~/utils/validation'

export const schema = z.object({
  city: cityRule,
  country: countryRule,
  dateOfBirth: dateOfBirthRule,
  email: emailRule,
  firstName: firstNameRule,
  lastName: lastNameRule,
  password: passwordRule,
  postalCode: postalCodeRule,
  streetName: streetNameRule
})

export type SchemaType = typeof schema
