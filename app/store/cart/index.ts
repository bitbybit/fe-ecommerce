import { createSelector, type Selector } from '@reduxjs/toolkit'
import { type LineItem, type ProductProjection } from '@commercetools/platform-sdk'
import { type RootState } from '~/store/types'
import { createAppSlice } from '~/store/hooks'
import { CART_TABLE_STATUS, type CartState } from '~/store/cart/types'
import { createAddProductThunk } from '~/store/cart/reducers/addProduct'
import { createRemoveProductThunk } from '~/store/cart/reducers/removeProduct'
import { createGetCartThunk } from '~/store/cart/reducers/getCart'
import { createApplyCodeThunk } from '~/store/cart/reducers/applyCode'
import { createUpdateQuantityThunk } from '~/store/cart/reducers/updateQuantity'
import { createClearCartThunk } from '~/store/cart/reducers/clearCart'

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
    updateQuantity: createUpdateQuantityThunk(create),
    getCart: createGetCartThunk(create),
    clearCart: createClearCartThunk(create),
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

export const selectCartItemCount = createSelector([selectCartSlice], (cart) => cart.cart?.totalLineItemQuantity ?? 0)

export const { addProduct, removeProduct, updateQuantity, getCart, clearCart, applyCode } = cart.actions

export default cart.reducer
