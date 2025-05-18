import { type ReducerCreators } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import { ctpApiClient, type CtpApiClient } from '~/api/client'
import { AUTH_STATUS, type AuthState } from '~/store/auth'

type SignUpThunkResult = Awaited<ReturnType<CtpApiClient['signup']>>['body']

type SignUpThunkPayload = {
  city: Parameters<CtpApiClient['signup']>[0]['city']
  country: Parameters<CtpApiClient['signup']>[0]['country']
  dateOfBirth: Date
  email: Parameters<CtpApiClient['signup']>[0]['email']
  firstName: Parameters<CtpApiClient['signup']>[0]['firstName']
  lastName: Parameters<CtpApiClient['signup']>[0]['lastName']
  password: Parameters<CtpApiClient['signup']>[0]['password']
  postalCode: Parameters<CtpApiClient['signup']>[0]['postalCode']
  streetName: Parameters<CtpApiClient['signup']>[0]['streetName']
}

type SignUpThunkConfig = { rejectValue: string }

export const createSignUpThunk = (
  create: ReducerCreators<AuthState>
): ReturnType<typeof create.asyncThunk<SignUpThunkResult, SignUpThunkPayload, SignUpThunkConfig>> =>
  create.asyncThunk<SignUpThunkResult, SignUpThunkPayload, SignUpThunkConfig>(
    async (payload, { rejectWithValue }) => {
      try {
        const response = await ctpApiClient.signup({
          ...payload,
          dateOfBirth: format(payload.dateOfBirth, 'yyyy-MM-dd')
        })

        return response.body
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message)
        }

        return rejectWithValue(String(error))
      }
    },

    {
      pending: (state) => {
        state.errorMessage = ''
        state.status = AUTH_STATUS.LOADING
      },

      fulfilled: (state) => {
        state.status = AUTH_STATUS.READY
      },

      rejected: (state, action) => {
        state.errorMessage = action.payload ?? ''
        state.status = AUTH_STATUS.ERROR
      }
    }
  )
