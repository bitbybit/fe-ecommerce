import { type ReducerCreators } from '@reduxjs/toolkit'
import { cartApi, type CartApi } from '~/api/namespaces/cart'
import { CART_TABLE_STATUS, type CartState } from '~/store/cart/types'

type GetCartThunkResult = Awaited<ReturnType<CartApi['getCart']>>

type GetCartThunkConfig = { rejectValue: string }

export const createGetCartThunk = (
  create: ReducerCreators<CartState>
): ReturnType<typeof create.asyncThunk<GetCartThunkResult, undefined, GetCartThunkConfig>> =>
  create.asyncThunk<GetCartThunkResult, undefined, GetCartThunkConfig>(
    async (_, { rejectWithValue }) => {
      try {
        return await cartApi.getCart()
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message)
        }

        return rejectWithValue(String(error))
      }
    },

    {
      pending: (state) => {
        state.cart = undefined
        state.errorMessage = ''
        state.status = CART_TABLE_STATUS.LOADING
      },

      fulfilled: (state, action) => {
        state.cart = action.payload
        state.status = CART_TABLE_STATUS.READY
      },

      rejected: (state, action) => {
        state.errorMessage = action.payload ?? 'Unknown error while getting cart'
        state.status = CART_TABLE_STATUS.ERROR
      }
    }
  )
