import { type ReducerCreators } from '@reduxjs/toolkit'
import { ctpApiClient } from '~/api/client'
import { AUTH_STATUS, type AuthState } from '~/store/auth'

type LogoutThunkConfig = { rejectValue: string }

export const createLogOutThunk = (
  create: ReducerCreators<AuthState>
): ReturnType<typeof create.asyncThunk<void, void, LogoutThunkConfig>> =>
  create.asyncThunk<void, void, LogoutThunkConfig>(
    (_, { rejectWithValue }) => {
      try {
        ctpApiClient.logout()
      } catch (error) {
        return rejectWithValue(String(error))
      }
    },
    {
      pending: (state) => {
        state.status = AUTH_STATUS.LOADING
      },
      fulfilled: (state) => {
        state.customer = undefined
        state.errorMessage = ''
        state.status = AUTH_STATUS.READY
      },
      rejected: (state, action) => {
        state.errorMessage = action.payload
        state.status = AUTH_STATUS.ERROR
      }
    }
  )
