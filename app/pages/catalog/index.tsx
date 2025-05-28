import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import ProductList from './product-list'

export default function Catalog(): ReactElement {
  useTitle('Catalog')

  return <ProductList />
}
