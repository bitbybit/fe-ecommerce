import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { Loading } from '~/components/Loading'
import { ProductList } from './ProductList'
import { FilterFormBody } from './FilterForm/FilterFormBody'
import { useCatalogData } from './hooks/useCatalogData'
import { SearchFormBody } from './SearchForm/SearchFomBody'

export default function Catalog(): ReactElement {
  useTitle('Catalog')

  const { products, filters, status, fetchProducts, categories } = useCatalogData()

  if (filters.length === 0) {
    return <Loading />
  }

  return (
    <div className="flex h-full w-full">
      <FilterFormBody filters={filters} categories={categories} fetch={fetchProducts} />
      <div className="flex-grow">
        <SearchFormBody fetch={fetchProducts} />
        <ProductList products={products} status={status} />
      </div>
    </div>
  )
}
