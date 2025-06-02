import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { ProductList } from './ProductList'
import { FilterFormBody } from './FilterForm/FilterFormBody'
import { useCatalogData } from './hooks/useCatalogData'
import { SearchFormBody } from './SearchForm/SearchFomBody'

export default function Catalog(): ReactElement {
  useTitle('Catalog')

  const { products, filters, status, fetchProducts } = useCatalogData()

  return (
    <div className="flex items-start justify-start flex-grow w-full h-full">
      <FilterFormBody filters={filters} fetch={fetchProducts} />
      <div className="flex-gow w-full">
        <SearchFormBody fetch={fetchProducts} />
        <ProductList products={products} status={status} />
      </div>
    </div>
  )
}
