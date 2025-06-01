import type { ProductProjection } from '@commercetools/platform-sdk'
import { createAppSlice } from '~/store/hooks'
import { createGetProductsThunk } from './reducers/getProducts'

export enum PRODUCT_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export interface ProductState {
  products: ProductProjection[]
  status: PRODUCT_STATUS
  errorMessage: string
}

const initialState: ProductState = {
  products: [],
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
