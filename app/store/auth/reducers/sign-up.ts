import { type ReducerCreators } from '@reduxjs/toolkit'
import { ctpApiClient, type CtpApiClient } from '~/api/client'
import { AUTH_STATUS, type AuthState } from '~/store/auth'

type SignUpThunkResult = Awaited<ReturnType<CtpApiClient['signup']>>['body']

type SignUpThunkPayload = {
  email: Parameters<CtpApiClient['signup']>[0]['email']
  password: Parameters<CtpApiClient['signup']>[0]['password']
  firstName: Parameters<CtpApiClient['signup']>[0]['firstName']
  lastName: Parameters<CtpApiClient['signup']>[0]['lastName']
}

type SignUpThunkConfig = { rejectValue: string }

export const createSignUpThunk = (
  create: ReducerCreators<AuthState>
): ReturnType<typeof create.asyncThunk<SignUpThunkResult, SignUpThunkPayload, SignUpThunkConfig>> =>
  create.asyncThunk<SignUpThunkResult, SignUpThunkPayload, SignUpThunkConfig>(
    async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
      try {
        const response = await ctpApiClient.signup({ email, password, firstName, lastName })

        return response.body
      } catch (error) {
        return rejectWithValue(String(error))
      }
    },

    {
      pending: (state) => {
        state.status = AUTH_STATUS.LOADING
      },

      fulfilled: (state) => {
        state.status = AUTH_STATUS.READY
      },

      rejected: (state, action) => {
        state.errorMessage = action.payload
        state.status = AUTH_STATUS.ERROR
      }
    }
  )
