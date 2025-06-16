import { createSelector, type Selector } from '@reduxjs/toolkit'
import { type LineItem, type ProductProjection } from '@commercetools/platform-sdk'
import { type RootState } from '~/store/types'
import { createAppSlice } from '~/store/hooks'
import { CART_TABLE_STATUS, type CartState } from '~/store/cart/types'
import { createAddProductThunk } from '~/store/cart/reducers/addProduct'
import { createRemoveProductThunk } from '~/store/cart/reducers/removeProduct'
import { createGetCartThunk } from '~/store/cart/reducers/getCart'
import { createApplyCodeThunk } from '~/store/cart/reducers/applyCode'

const initialState: CartState = {
  cart: undefined,
  status: CART_TABLE_STATUS.READY,
  errorMessage: ''
}

const cart = createAppSlice({
  name: 'cart',
  initialState,

  reducers: (create) => ({
    addProduct: createAddProductThunk(create),
    removeProduct: createRemoveProductThunk(create),
    getCart: createGetCartThunk(create),
    applyCode: createApplyCodeThunk(create)
  })
})

const selectCartSlice: Selector<RootState, CartState> = (state: RootState): CartState => state.cart

export const selectIsEmptyCart: Selector<RootState, boolean> = createSelector(
  [selectCartSlice],
  (cart) => (cart.cart?.lineItems?.length ?? 0) === 0
)

export const selectCartItems: Selector<RootState, LineItem[]> = createSelector(
  [selectCartSlice],
  (cart) => cart.cart?.lineItems ?? []
)

export const selectIsInCart = (product: ProductProjection): Selector<RootState, boolean> =>
  createSelector([selectCartItems], (items) => items.some(({ productId }) => productId === product.id))

export const { addProduct, removeProduct, getCart, applyCode } = cart.actions
export default cart.reducer
