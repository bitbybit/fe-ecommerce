export const isLoginError = (error: unknown): boolean => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    error.statusCode === 400 &&
    'code' in error &&
    error.code === 'invalid_customer_account_credentials'
  )
}
