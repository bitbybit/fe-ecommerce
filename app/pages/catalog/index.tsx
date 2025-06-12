import { useState, type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { Loading } from '~/components/Loading'
import { ProductList } from './ProductList'
import { FilterFormBody } from './FilterForm/FilterFormBody'
import { CATALOG_STATUS, useCatalogData } from './hooks/useCatalogData'
import { SearchFormBody } from './SearchForm/SearchFomBody'
import { NoProductsFound } from './NoProductsFound'
import { ITEMS_PER_PAGE, PaginationControls } from './PaginationControls'

export default function Catalog(): ReactElement {
  useTitle('Catalog')
  const { products, filters, status, categories, fetchProducts, total } = useCatalogData()
  const noProductsFound = status === CATALOG_STATUS.READY && products.length === 0
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const pagesCount = Math.ceil(total / ITEMS_PER_PAGE)

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
    void fetchProducts({ limit: ITEMS_PER_PAGE, offset: (page - 1) * ITEMS_PER_PAGE }, [], [], searchText)
  }
  if (filters.length === 0) {
    return <Loading />
  }
  return (
    <div className="flex h-full w-full">
      <FilterFormBody
        filters={filters}
        categories={categories}
        fetch={fetchProducts}
        onApply={() => {
          setCurrentPage(1)
          setSearchText('')
        }}
      />
      <div className="flex-grow">
        <SearchFormBody fetch={fetchProducts} setSearch={setSearchText} onSearch={() => setCurrentPage(1)} />
        {noProductsFound ? (
          <NoProductsFound />
        ) : (
          <div>
            <ProductList products={products} status={status} />
            <PaginationControls page={currentPage} totalPage={pagesCount} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  )
}
