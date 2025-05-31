import { useEffect, useState, type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { ProductList } from './ProductList'
import Sidebar from './sidebar'
import type { ProductProjection } from '@commercetools/platform-sdk'
import { productApi } from '~/api/namespaces/product'
import { createFilterQueryArguments, type Filters } from './sidebar/createFilterQuery'

export default function Catalog(): ReactElement {
  useTitle('Catalog')
  const [filters, setFilters] = useState<Filters>({})
  const [products, setProducts] = useState<ProductProjection[]>([])

  useEffect(() => {
    async function fetchFilteredProducts(): Promise<void> {
      const filteredProducts = createFilterQueryArguments(filters)
      if (filteredProducts.length > 0) {
        const response = await productApi.filterProducts({
          filter: filteredProducts,
          limit: 100
        })
        setProducts(response.body.results)
      }
    }
    void fetchFilteredProducts()
  }, [filters])

  return (
    <div className="flex h-full">
      <Sidebar setFilters={setFilters} />
      <ProductList filteredProducts={products} />
    </div>
  )
}
