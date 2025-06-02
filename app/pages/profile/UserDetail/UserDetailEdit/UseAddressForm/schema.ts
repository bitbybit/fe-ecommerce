import { z } from 'zod'
import { cityRule, countryRule, postalCodeRule, streetNameRule, withCountryPostalCodeRule } from '~/utils/validation'

export const schema = withCountryPostalCodeRule(
  z.object({
    city: cityRule,
    country: countryRule,
    postalCode: postalCodeRule,
    streetName: streetNameRule
  })
)

export type SchemaType = typeof schema
