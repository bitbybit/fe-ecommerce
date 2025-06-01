import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { ProductList } from './ProductList'
import { FilterFormBody } from './FilterForm/FilterFormBody'
import { useCatalogData } from './hooks/useCatalogData'

export default function Catalog(): ReactElement {
  useTitle('Catalog')

  const { products, filters, status, fetchProducts } = useCatalogData()

  return (
    <div className="flex items-start justify-start h-full w-full absolute top-0 left-0">
      <FilterFormBody filters={filters} fetch={fetchProducts} />
      <ProductList products={products} status={status} />
    </div>
  )
}
