import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { ProductList } from './ProductList'

export default function Catalog(): ReactElement {
  useTitle('Catalog')

  return <ProductList />
}
