import { createAppSlice } from '~/store/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Customer, type ClientResponse, type CustomerSignin } from '@commercetools/platform-sdk'
import { ctpApiClient } from '~/api/client'

interface State {
  value: Customer | undefined
  loading: boolean
  error: string | undefined
}

const initialState: State = {
  value: undefined,
  loading: false,
  error: undefined
}

export const signIn = createAsyncThunk<Customer, CustomerSignin>('auth/signIn', async ({ email, password }) => {
  const response: ClientResponse<Customer> = await ctpApiClient.login(email, password)
  console.log('OK', JSON.stringify(response.body))
  return response.body
})

const auth = createAppSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false
      state.value = action.payload
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? 'Unknown error'
      console.error(action.error.message)
    })
  }
})

export default auth.reducer
