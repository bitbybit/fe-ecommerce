import { z } from 'zod'
import { emailRule, passwordRule } from '~/utils/validation'

export const schema = z.object({
  email: emailRule,
  password: passwordRule
})

export type SchemaType = typeof schema
