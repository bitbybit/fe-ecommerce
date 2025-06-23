import { useEffect } from 'react'
import { useAppDispatch } from '~/store/hooks'
import { getCart } from '~/store/cart'

export function useFetchCart(): void {
  const dispatch = useAppDispatch()

  useEffect(() => void dispatch(getCart()), [])
}
