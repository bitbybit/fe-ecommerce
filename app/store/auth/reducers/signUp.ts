import { type ReducerCreators } from '@reduxjs/toolkit'
import { formatDateForSdk } from '~/utils/formatDate'
import { ctpApiClient, type CtpApiClient, type CustomerAddress, CUSTOMER_ADDRESS_TYPE } from '~/api/client'
import { AUTH_STATUS, type AuthState } from '~/store/auth'

type SignUpThunkResult = Awaited<ReturnType<CtpApiClient['signup']>>['body']

type SignUpThunkAddressPayload = {
  city: CustomerAddress['city']
  country: CustomerAddress['country']
  postalCode: CustomerAddress['postalCode']
  streetName: CustomerAddress['streetName']
}

type SignUpThunkPayload = {
  addressBilling: SignUpThunkAddressPayload
  addressMain: SignUpThunkAddressPayload
  addressShipping: SignUpThunkAddressPayload
  dateOfBirth: Date
  email: Parameters<CtpApiClient['signup']>[0]['email']
  firstName: Parameters<CtpApiClient['signup']>[0]['firstName']
  lastName: Parameters<CtpApiClient['signup']>[0]['lastName']
  password: Parameters<CtpApiClient['signup']>[0]['password']
}

type SignUpThunkConfig = { rejectValue: string }

const mapThunkToApi = (payload: SignUpThunkPayload): Parameters<CtpApiClient['signup']>[0] => ({
  addresses: [
    { ...payload.addressMain, type: CUSTOMER_ADDRESS_TYPE.DEFAULT },
    { ...payload.addressShipping, type: CUSTOMER_ADDRESS_TYPE.SHIPPING },
    { ...payload.addressBilling, type: CUSTOMER_ADDRESS_TYPE.BILLING }
  ],
  dateOfBirth: formatDateForSdk(payload.dateOfBirth),
  email: payload.email,
  firstName: payload.firstName,
  lastName: payload.lastName,
  password: payload.password
})

export const createSignUpThunk = (
  create: ReducerCreators<AuthState>
): ReturnType<typeof create.asyncThunk<SignUpThunkResult, SignUpThunkPayload, SignUpThunkConfig>> =>
  create.asyncThunk<SignUpThunkResult, SignUpThunkPayload, SignUpThunkConfig>(
    async (payload, { rejectWithValue }) => {
      try {
        const response = await ctpApiClient.signup(mapThunkToApi(payload))

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
        state.errorMessage = action.payload ?? 'Unknown error while signing up.'
        state.status = AUTH_STATUS.ERROR
      }
    }
  )
