import { createAppSlice } from '~/store/hooks'
import { type Customer } from '@commercetools/platform-sdk'
import { createSignInThunk } from './reducers/sign-in'
import { createSignUpThunk } from './reducers/sign-up'
import { createLogOutThunk } from './reducers/log-out'
import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '..'

export enum AUTH_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export interface AuthState {
  customer: Customer | undefined
  status: AUTH_STATUS
  errorMessage: string
}

const initialState: AuthState = {
  customer: undefined,
  status: AUTH_STATUS.READY,
  errorMessage: ''
}

const auth = createAppSlice({
  name: 'auth',
  initialState,

  reducers: (create) => ({
    signIn: createSignInThunk(create),
    signUp: createSignUpThunk(create),
    logOut: createLogOutThunk(create)
  })
})

const selectAuthSlice = (state: RootState): AuthState => state.auth

export const selectIsAuth = createSelector([selectAuthSlice], (auth) => auth.customer !== undefined)

export const { signIn, signUp, logOut } = auth.actions
export default auth.reducer
