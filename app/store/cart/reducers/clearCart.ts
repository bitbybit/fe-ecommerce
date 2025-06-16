import { type ReducerCreators } from '@reduxjs/toolkit'
import { cartApi, type CartApi } from '~/api/namespaces/cart'
import { CART_TABLE_STATUS, type CartState } from '~/store/cart/types'

type ClearCartThunkResult = Awaited<ReturnType<CartApi['clearCart']>>

type ClearCartThunkConfig = { rejectValue: string }

export const createClearCartThunk = (
  create: ReducerCreators<CartState>
): ReturnType<typeof create.asyncThunk<ClearCartThunkResult, undefined, ClearCartThunkConfig>> =>
  create.asyncThunk<ClearCartThunkResult, undefined, ClearCartThunkConfig>(
    async (_, { rejectWithValue }) => {
      try {
        return await cartApi.clearCart()
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
        state.errorMessage = action.payload ?? 'Unknown error while clearing cart'
        state.status = CART_TABLE_STATUS.ERROR
      }
    }
  )
