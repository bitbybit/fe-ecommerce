import { type Customer } from '@commercetools/platform-sdk'
import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '~/store'
import { createAppSlice } from '~/store/hooks'
import { createSignInThunk } from './reducers/signIn'
import { createSignUpThunk } from './reducers/signUp'
import { createLogOutThunk } from './reducers/logOut'
import { createCheckAuthThunk } from './reducers/checkAuth'

export enum AUTH_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export interface AuthState {
  checkedAuth: boolean
  customer: Customer | undefined
  errorMessage: string
  status: AUTH_STATUS
}

const initialState: AuthState = {
  customer: undefined,
  checkedAuth: false,
  status: AUTH_STATUS.READY,
  errorMessage: ''
}

const auth = createAppSlice({
  name: 'auth',
  initialState,

  reducers: (create) => ({
    checkAuth: createCheckAuthThunk(create),
    logOut: createLogOutThunk(create),
    signIn: createSignInThunk(create),
    signUp: createSignUpThunk(create),

    resetAuthError: create.reducer((state) => {
      state.errorMessage = ''
      state.status = AUTH_STATUS.READY
    })
  })
})

const selectAuthSlice = (state: RootState): AuthState => state.auth

export const selectIsAuth = createSelector([selectAuthSlice], (auth) => auth.customer !== undefined)

export const { signIn, signUp, logOut, checkAuth, resetAuthError } = auth.actions
export default auth.reducer
