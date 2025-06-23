import { type ReducerCreators } from '@reduxjs/toolkit'
import { cartApi, type CartApi } from '~/api/namespaces/cart'
import { CART_TABLE_STATUS, type CartState } from '~/store/cart/types'

type UpdateQuantityThunkResult = Awaited<ReturnType<CartApi['updateProductQuantity']>>['body']

type UpdateQuantityThunkPayload = {
  productId: Parameters<CartApi['updateProductQuantity']>[0]
  quantity: Parameters<CartApi['updateProductQuantity']>[1]
}

type UpdateQuantityThunkConfig = { rejectValue: string }

export const createUpdateQuantityThunk = (
  create: ReducerCreators<CartState>
): ReturnType<
  typeof create.asyncThunk<UpdateQuantityThunkResult, UpdateQuantityThunkPayload, UpdateQuantityThunkConfig>
> =>
  create.asyncThunk<UpdateQuantityThunkResult, UpdateQuantityThunkPayload, UpdateQuantityThunkConfig>(
    async ({ productId, quantity }, { rejectWithValue }) => {
      try {
        const response = await cartApi.updateProductQuantity(productId, quantity)

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
        state.errorMessage = action.payload ?? 'Unknown error while updating product quantity'
        state.status = CART_TABLE_STATUS.ERROR
      }
    }
  )
