import { type Action, type EnhancedStore, type ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// TODO: add reducers to `combineSlices` arguments
const rootReducer = combineSlices()

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>): EnhancedStore => {
  const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
    },

    preloadedState
  })

  setupListeners(store.dispatch)

  return store
}

export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore['dispatch']

export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>
