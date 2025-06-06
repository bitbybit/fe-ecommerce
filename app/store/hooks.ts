// eslint-disable-next-line no-restricted-imports
import { useDispatch, useSelector } from 'react-redux'
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'
import { type RootState, type AppDispatch } from '~/store/types'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
})
