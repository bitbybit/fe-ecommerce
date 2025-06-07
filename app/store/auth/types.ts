import { type Customer } from '@commercetools/platform-sdk'

export enum AUTH_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type AuthState = {
  checkedAuth: boolean
  customer: Customer | undefined
  errorMessage: string
  status: AUTH_STATUS
}
