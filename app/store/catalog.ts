import { type PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '~/store/hooks'

interface State {
  value: undefined
}

const initialState: State = {
  value: undefined
}

const catalog = createAppSlice({
  name: 'catalog',
  initialState,

  reducers: {
    setValue(state, action: PayloadAction<undefined>) {
      state.value = action.payload
    }
  }
})

export const { setValue } = catalog.actions

export default catalog.reducer
