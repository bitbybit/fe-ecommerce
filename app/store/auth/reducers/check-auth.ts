import { type ReducerCreators } from '@reduxjs/toolkit'
import { ctpApiClient, type CtpApiClient } from '~/api/client'
import { type AuthState } from '~/store/auth'

type CheckAuthThunkResult = Awaited<ReturnType<CtpApiClient['getCurrentCustomer']>>['body']

type CheckAuthThunkConfig = { rejectValue: string }

export const createCheckAuthThunk = (
  create: ReducerCreators<AuthState>
): ReturnType<typeof create.asyncThunk<CheckAuthThunkResult, void, CheckAuthThunkConfig>> =>
  create.asyncThunk<CheckAuthThunkResult, void, CheckAuthThunkConfig>(
    async (_, { rejectWithValue }) => {
      if (!ctpApiClient.hasToken) {
        return rejectWithValue('Has no token')
      }

      try {
        const response = await ctpApiClient.getCurrentCustomer()

        return response.body
      } catch (error) {
        ctpApiClient.logout()
        return rejectWithValue(String(error))
      }
    },

    {
      pending: (state) => {
        state.customer = undefined
      },

      fulfilled: (state, action) => {
        state.customer = action.payload
      }
    }
  )
