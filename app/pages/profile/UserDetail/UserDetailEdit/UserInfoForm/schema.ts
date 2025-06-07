import { z } from 'zod'
import { dateOfBirthRule, emailRule, firstNameRule, lastNameRule } from '~/utils/validation'

export const schema = z.object({
  dateOfBirth: dateOfBirthRule,
  email: emailRule,
  firstName: firstNameRule,
  lastName: lastNameRule
})

export type SchemaType = typeof schema
