import { createAppSlice } from '~/store/hooks'
import { type Customer } from '@commercetools/platform-sdk'
import { createSignInThunk } from './reducers/sign-in'
import { createSignUpThunk } from './reducers/sign-up'

export enum AUTH_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export interface AuthState {
  isAuth: boolean
  customer: Customer | undefined
  status: AUTH_STATUS
  errorMessage: string
}

const initialState: AuthState = {
  isAuth: false,
  customer: undefined,
  status: AUTH_STATUS.READY,
  errorMessage: ''
}

const auth = createAppSlice({
  name: 'auth',
  initialState,

  reducers: (create) => ({
    signIn: createSignInThunk(create),
    signUp: createSignUpThunk(create)
  })
})

export const { signIn, signUp } = auth.actions
export default auth.reducer
