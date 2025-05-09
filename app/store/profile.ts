import { type PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '~/store/hooks'

interface State {
  value: undefined
}

const initialState: State = {
  value: undefined
}

const profile = createAppSlice({
  name: 'profile',
  initialState,

  reducers: {
    setValue(state, action: PayloadAction<undefined>) {
      state.value = action.payload
    }
  }
})

export const { setValue } = profile.actions

export default profile.reducer
