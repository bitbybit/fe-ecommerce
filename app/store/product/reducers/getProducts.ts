import type { ReducerCreators } from '@reduxjs/toolkit'
import { PRODUCT_STATUS, type ProductState } from '~/store/product'
import { type ProductApi, productApi, type ProductListQueryParameters } from '~/api/namespaces/product'

type GetProductsThunkResult = Awaited<ReturnType<ProductApi['getProducts']>>['body']

type GetProductsThunkPayload = ProductListQueryParameters

type GetProductsThunkConfig = { rejectValue: string }

export const createGetProductsThunk = (
  create: ReducerCreators<ProductState>
): ReturnType<typeof create.asyncThunk<GetProductsThunkResult, GetProductsThunkPayload, GetProductsThunkConfig>> =>
  create.asyncThunk<GetProductsThunkResult, GetProductsThunkPayload, GetProductsThunkConfig>(
    async (payload, { rejectWithValue }) => {
      try {
        const response = await productApi.getProducts({ ...payload, limit: 100 })
        return response.body
      } catch (error) {
        return rejectWithValue(String(error))
      }
    },
    {
      pending: (state) => {
        state.products = []
        state.errorMessage = ''
        state.status = PRODUCT_STATUS.LOADING
      },

      fulfilled: (state, action) => {
        state.products = action.payload.results
        state.status = PRODUCT_STATUS.READY
      },

      rejected: (state, action) => {
        state.errorMessage = action.payload ?? 'Unknown error while getting products'
        state.status = PRODUCT_STATUS.ERROR
      }
    }
  )
