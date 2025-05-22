import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'
import { createAppSlice } from '~/store/hooks'
import { createGetProductsThunk } from './reducers/get-products'

export enum PRODUCT_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export interface ProductState {
  products: ProductProjectionPagedQueryResponse | undefined
  status: PRODUCT_STATUS
  errorMessage: string
}

const initialState: ProductState = {
  products: undefined,
  status: PRODUCT_STATUS.LOADING,
  errorMessage: ''
}

const product = createAppSlice({
  name: 'product',
  initialState,

  reducers: (create) => ({
    getProducts: createGetProductsThunk(create),

    resetProductError: create.reducer((state) => {
      state.errorMessage = ''
      state.status = PRODUCT_STATUS.READY
    })
  })
})

export const { getProducts } = product.actions

export default product.reducer
