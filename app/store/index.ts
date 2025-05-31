import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from '~/store/auth'
import cartReducer from '~/store/cart'
import profileReducer from '~/store/profile'

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  profile: profileReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>): ReturnType<typeof configureStore<RootState>> =>
  configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
    },

    preloadedState
  })

export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore['dispatch']
