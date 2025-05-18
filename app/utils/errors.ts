import { type AuthErrorResponse } from '@commercetools/platform-sdk'

export const ERROR_MESSAGE_INVALID_CREDENTIALS = 'Incorrect email or password. Please try again.'

export const isInvalidCredentials = (error: unknown): error is AuthErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    error.statusCode === 400 &&
    'code' in error &&
    error.code === 'invalid_customer_account_credentials'
  )
}
