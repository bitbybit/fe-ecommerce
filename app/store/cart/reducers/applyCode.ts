import { type ReducerCreators } from '@reduxjs/toolkit'
import { cartApi, type CartApi } from '~/api/namespaces/cart'
import { CART_TABLE_STATUS, type CartState } from '~/store/cart/types'

type ApplyCodeThunkResult = Awaited<ReturnType<CartApi['applyDiscountCode']>>['body']

type ApplyCodeThunkPayload = {
  code: Parameters<CartApi['applyDiscountCode']>[0]
}

type ApplyCodeThunkConfig = { rejectValue: string }

export const createApplyCodeThunk = (
  create: ReducerCreators<CartState>
): ReturnType<typeof create.asyncThunk<ApplyCodeThunkResult, ApplyCodeThunkPayload, ApplyCodeThunkConfig>> =>
  create.asyncThunk<ApplyCodeThunkResult, ApplyCodeThunkPayload, ApplyCodeThunkConfig>(
    async ({ code }, { rejectWithValue }) => {
      try {
        const response = await cartApi.applyDiscountCode(code)

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
        state.status = CART_TABLE_STATUS.LOADING
      },

      fulfilled: (state, action) => {
        state.cart = action.payload
        state.status = CART_TABLE_STATUS.READY
      },

      rejected: (state, action) => {
        state.errorMessage = action.payload ?? 'Unknown error while adding product to cart'
        state.status = CART_TABLE_STATUS.ERROR
      }
    }
  )
