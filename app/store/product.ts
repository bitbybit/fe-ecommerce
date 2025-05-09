import { type PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '~/store/hooks'

interface State {
  value: undefined
}

const initialState: State = {
  value: undefined
}

const product = createAppSlice({
  name: 'product',
  initialState,

  reducers: {
    setValue(state, action: PayloadAction<undefined>) {
      state.value = action.payload
    }
  }
})

export const { setValue } = product.actions

export default product.reducer
