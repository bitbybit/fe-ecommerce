import { z } from 'zod'
import {
  cityRule,
  countryRule,
  dateOfBirthRule,
  emailRule,
  firstNameRule,
  lastNameRule,
  passwordRule,
  streetNameRule,
  postalCodeRule,
  withCountryPostalCodeRule
} from '~/utils/validation'

export const addressSchema = withCountryPostalCodeRule(
  z.object({
    city: cityRule,
    country: countryRule,
    postalCode: postalCodeRule,
    streetName: streetNameRule
  })
)

export const schema = z.object({
  addressBilling: addressSchema,
  addressBillingSameAsMain: z.boolean(),
  addressMain: addressSchema,
  addressShipping: addressSchema,
  addressShippingSameAsMain: z.boolean(),
  dateOfBirth: dateOfBirthRule,
  email: emailRule,
  firstName: firstNameRule,
  lastName: lastNameRule,
  password: passwordRule
})

export type AddressPath = 'addressMain' | 'addressShipping' | 'addressBilling'

export type SchemaType = typeof schema
