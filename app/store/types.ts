import { type configureStore } from '@reduxjs/toolkit'
import { type AuthState } from '~/store/auth/types'
import { type CartState } from '~/store/cart/types'

export type RootState = {
  auth: AuthState
  cart: CartState
}

export type AppStore = ReturnType<typeof configureStore<RootState>>

export type AppDispatch = AppStore['dispatch']
