import { type ReducerCreators } from '@reduxjs/toolkit'
import { ctpApiClient, type CtpApiClient } from '~/api/client'
import { AUTH_STATUS, type AuthState } from '~/store/auth'
import { ERROR_MESSAGE_INVALID_CREDENTIALS, isInvalidCredentials } from '~/utils/errors'

type SignInThunkResult = Awaited<ReturnType<CtpApiClient['login']>>['body']

type SignInThunkPayload = {
  email: Parameters<CtpApiClient['login']>[0]
  password: Parameters<CtpApiClient['login']>[1]
}

type SignInThunkConfig = { rejectValue: string }

export const createSignInThunk = (
  create: ReducerCreators<AuthState>
): ReturnType<typeof create.asyncThunk<SignInThunkResult, SignInThunkPayload, SignInThunkConfig>> =>
  create.asyncThunk<SignInThunkResult, SignInThunkPayload, SignInThunkConfig>(
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await ctpApiClient.login(email, password)

        return response.body
      } catch (error) {
        if (isInvalidCredentials(error)) {
          return rejectWithValue(ERROR_MESSAGE_INVALID_CREDENTIALS)
        }
        return rejectWithValue(String(error))
      }
    },

    {
      pending: (state) => {
        state.customer = undefined
        state.errorMessage = ''
        state.status = AUTH_STATUS.LOADING
      },

      fulfilled: (state, action) => {
        state.customer = action.payload
        state.status = AUTH_STATUS.READY
      },

      rejected: (state, action) => {
        state.errorMessage = action.payload ?? 'Unknown error while signing in.'
        state.status = AUTH_STATUS.ERROR
      }
    }
  )
