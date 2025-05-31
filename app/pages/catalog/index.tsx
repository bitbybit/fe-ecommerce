import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { ProductList } from './ProductList'
import { FilterFormBody } from './FilterForm/FilterFormBody'
import { useCatalogData } from './hooks/useCatalogData'

export default function Catalog(): ReactElement {
  useTitle('Catalog')

  const { products, filters, status, fetchProducts } = useCatalogData()

  return (
    <div className="flex h-full">
      <FilterFormBody filters={filters} fetch={fetchProducts} />
      <ProductList products={products} status={status} />
    </div>
  )
}
