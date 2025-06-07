import { z } from 'zod'
import {
  cityRule,
  countryRule,
  firstNameRule,
  lastNameRule,
  postalCodeRule,
  streetNameRule,
  withCountryPostalCodeRule
} from '~/utils/validation'

export const schema = withCountryPostalCodeRule(
  z.object({
    city: cityRule,
    country: countryRule,
    firstName: firstNameRule,
    lastName: lastNameRule,
    postalCode: postalCodeRule,
    streetName: streetNameRule
  })
)

export type SchemaType = typeof schema
