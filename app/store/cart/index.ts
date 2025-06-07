import { type PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '~/store/hooks'
import { type CartState } from '~/store/cart/types'

const initialState: CartState = {
  value: undefined
}

const cart = createAppSlice({
  name: 'cart',
  initialState,

  reducers: {
    setValue(state, action: PayloadAction<undefined>) {
      state.value = action.payload
    }
  }
})

export const { setValue } = cart.actions

export default cart.reducer
