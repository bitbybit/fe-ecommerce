import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '~/store/root'

export const makeStore = (
  preloadedState?: Partial<ReturnType<typeof rootReducer>>
): ReturnType<typeof configureStore<ReturnType<typeof rootReducer>>> =>
  configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
    },

    preloadedState
  })

export const store = makeStore()
