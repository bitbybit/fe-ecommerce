import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { useFetchCart } from '~/hooks/useFetchCart'
import { ProductApi } from '~/api/namespaces/product'
import { Loading } from '~/components/Loading'
import { ProductList } from './ProductList'
import { FilterFormBody } from './FilterForm/FilterFormBody'
import { useCatalogData } from './hooks/useCatalogData'
import { SearchFormBody } from './SearchForm/SearchFomBody'
import { NoProductsFound } from './NoProductsFound'
import { PaginationControls } from './PaginationControls'

export default function Catalog(): ReactElement {
  useTitle('Catalog')
  useFetchCart()
  const data = useCatalogData()

  const handlePageChange = (page: number): void => {
    data.setCurrentPage(page)
    void data.fetchProducts(ProductApi.getPaginationQueryParameters(page), [], [], data.searchText)
  }

  if (data.filters.length === 0) {
    return <Loading />
  }

  return (
    <div className="flex h-full w-full">
      <FilterFormBody
        filters={data.filters}
        categories={data.categories}
        fetch={data.fetchProducts}
        onApply={data.resetCurrentPageAndSearchText}
      />
      <div className="flex-grow">
        <SearchFormBody
          fetch={data.fetchProducts}
          setSearch={data.setSearchText}
          onSearch={() => data.setCurrentPage(1)}
        />
        {data.hasNoProducts ? (
          <NoProductsFound />
        ) : (
          <div>
            <ProductList products={data.products} status={data.status} />
            <PaginationControls page={data.currentPage} totalPage={data.pagesCount} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  )
}
