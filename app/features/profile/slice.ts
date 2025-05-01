import { type PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '~/shared/utils/store'

interface State {
  value: undefined
}

const initialState: State = {
  value: undefined
}

const slice = createAppSlice({
  name: 'profile',
  initialState,

  reducers: {
    setValue(state, action: PayloadAction<undefined>) {
      state.value = action.payload
    }
  }
})

export const { setValue } = slice.actions

export default slice.reducer
