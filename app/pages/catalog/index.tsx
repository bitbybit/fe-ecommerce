import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import ProductList from './product-list'
import Sidebar from './sidebar'

export default function Catalog(): ReactElement {
  useTitle('Catalog')

  return (
    <div className="flex h-full">
      <Sidebar />
      <ProductList />
    </div>
  )
}
