import { type ReducerCreators } from '@reduxjs/toolkit'
import { cartApi, type CartApi } from '~/api/namespaces/cart'
import { CART_TABLE_STATUS, type CartState } from '~/store/cart/types'

type AddProductThunkResult = Awaited<ReturnType<CartApi['addProduct']>>['body']

type AddProductThunkPayload = {
  productId: Parameters<CartApi['addProduct']>[0]
  quantity: Parameters<CartApi['addProduct']>[1]
}

type AddProductThunkConfig = { rejectValue: string }

export const createAddProductThunk = (
  create: ReducerCreators<CartState>
): ReturnType<typeof create.asyncThunk<AddProductThunkResult, AddProductThunkPayload, AddProductThunkConfig>> =>
  create.asyncThunk<AddProductThunkResult, AddProductThunkPayload, AddProductThunkConfig>(
    async ({ productId, quantity }, { rejectWithValue }) => {
      try {
        const response = await cartApi.addProduct(productId, quantity)

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
        state.errorMessage = action.payload ?? 'Unknown error while adding product to cart'
        state.status = CART_TABLE_STATUS.ERROR
      }
    }
  )
