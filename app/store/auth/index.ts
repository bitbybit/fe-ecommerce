import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '~/store/types'
import { createAppSlice } from '~/store/hooks'
import { AUTH_STATUS, type AuthState } from '~/store/auth/types'
import { createSignInThunk } from '~/store/auth/reducers/signIn'
import { createSignUpThunk } from '~/store/auth/reducers/signUp'
import { createLogOutThunk } from '~/store/auth/reducers/logOut'
import { createCheckAuthThunk } from '~/store/auth/reducers/checkAuth'

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
    }),

    setCustomer: create.reducer((state, { payload }: { payload: AuthState['customer'] }) => {
      state.customer = payload
    })
  })
})

const selectAuthSlice = (state: RootState): AuthState => state.auth

export const selectIsAuth = createSelector([selectAuthSlice], (auth) => auth.customer !== undefined)

export const { signIn, signUp, logOut, checkAuth, resetAuthError, setCustomer } = auth.actions
export default auth.reducer
