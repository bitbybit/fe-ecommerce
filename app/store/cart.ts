import { type PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '~/store/hooks'

interface State {
  value: undefined
}

const initialState: State = {
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
