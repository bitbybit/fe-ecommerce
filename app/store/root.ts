import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '~/store/auth'
import cartReducer from '~/store/cart'

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer
})
