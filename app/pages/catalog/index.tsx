import { useEffect, type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import { useAppDispatch } from '~/store/hooks'
import { getProducts } from '~/store/product'
import ProductList from './product-list'

export default function Catalog(): ReactElement {
  useTitle('Catalog')
  const dispatch = useAppDispatch()

  useEffect(() => void dispatch(getProducts()).unwrap(), [dispatch])

  return <ProductList />
}
