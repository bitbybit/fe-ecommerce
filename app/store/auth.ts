import { createAppSlice } from '~/store/hooks'
import { type Customer } from '@commercetools/platform-sdk'
import { ctpApiClient, type CtpApiClient } from '~/api/client'

export enum STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

interface State {
  customer: Customer | undefined
  status: STATUS
  errorMessage: string | undefined
}

const initialState: State = {
  customer: undefined,
  status: STATUS.READY,
  errorMessage: undefined
}

const auth = createAppSlice({
  name: 'auth',
  initialState,

  reducers: (create) => ({
    signIn: create.asyncThunk<
      Awaited<ReturnType<CtpApiClient['login']>>['body'],
      {
        email: Parameters<CtpApiClient['login']>[0]
        password: Parameters<CtpApiClient['login']>[1]
      },
      { rejectValue: string }
    >(
      async ({ email, password }, { rejectWithValue }) => {
        try {
          const response = await ctpApiClient.login(email, password)

          return response.body
        } catch (error) {
          return rejectWithValue(String(error))
        }
      },
      {
        pending: (state) => {
          state.status = STATUS.LOADING
        },
        fulfilled: (state, action) => {
          state.customer = action.payload
          state.status = STATUS.READY
        },
        rejected: (state, action) => {
          state.errorMessage = action.payload
          state.status = STATUS.ERROR
        }
      }
    )
  })
})

export const { signIn } = auth.actions
export default auth.reducer
