import { type Cart } from '@commercetools/platform-sdk'

export enum CART_TABLE_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type CartState = {
  cart: Cart | undefined
  errorMessage: string
  status: CART_TABLE_STATUS
}
