import { type PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '~/store/hooks'

interface State {
  value: undefined
}

const initialState: State = {
  value: undefined
}

const auth = createAppSlice({
  name: 'auth',
  initialState,

  reducers: {
    setValue(state, action: PayloadAction<undefined>) {
      state.value = action.payload
    }
  }
})

export const { setValue } = auth.actions

export default auth.reducer
