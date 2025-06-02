import { z } from 'zod'
import { passwordRule } from '~/utils/validation'

export const schema = z.object({
  currentPassword: passwordRule,
  newPassword: passwordRule
})

export type SchemaType = typeof schema
