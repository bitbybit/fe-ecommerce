import { type ReducerCreators } from '@reduxjs/toolkit'
import { cartApi, type CartApi } from '~/api/namespaces/cart'
import { CART_TABLE_STATUS, type CartState } from '~/store/cart/types'

type RemoveProductThunkResult = Awaited<ReturnType<CartApi['removeProduct']>>['body']

type RemoveProductThunkPayload = {
  productId: Parameters<CartApi['removeProduct']>[0]
  quantity: Parameters<CartApi['removeProduct']>[1]
}

type RemoveProductThunkConfig = { rejectValue: string }

export const createRemoveProductThunk = (
  create: ReducerCreators<CartState>
): ReturnType<
  typeof create.asyncThunk<RemoveProductThunkResult, RemoveProductThunkPayload, RemoveProductThunkConfig>
> =>
  create.asyncThunk<RemoveProductThunkResult, RemoveProductThunkPayload, RemoveProductThunkConfig>(
    async ({ productId, quantity }, { rejectWithValue }) => {
      try {
        const response = await cartApi.removeProduct(productId, quantity)

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
        state.cart = undefined
        state.errorMessage = ''
        state.status = CART_TABLE_STATUS.LOADING
      },

      fulfilled: (state, action) => {
        state.cart = action.payload
        state.status = CART_TABLE_STATUS.READY
      },

      rejected: (state, action) => {
        state.errorMessage = action.payload ?? 'Unknown error while removing product from cart'
        state.status = CART_TABLE_STATUS.ERROR
      }
    }
  )
