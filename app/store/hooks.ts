// eslint-disable-next-line no-restricted-imports
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from './index'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()
