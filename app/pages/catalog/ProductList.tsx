import { type ReactElement } from 'react'
import { type ProductProjection } from '@commercetools/platform-sdk'
import { Skeleton } from '~/components/ui/Skeleton'
import { ProductItem } from './ProductItem'
import { CATALOG_STATUS } from './hooks/useCatalogData'
import { PRODUCT_LIST_ITEMS_PER_PAGE } from '~/api/namespaces/product'

type ProductListProperties = {
  products: ProductProjection[]
  status: CATALOG_STATUS
}

export function ProductList({ products, status }: ProductListProperties): ReactElement {
  const isNotReady = status !== CATALOG_STATUS.READY

  return (
    <div className="flex gap-3 flex-wrap px-2 pt-1 pb-3">
      {isNotReady
        ? // TODO: move to separate component
          Array.from({ length: PRODUCT_LIST_ITEMS_PER_PAGE }).map((_, index) => (
            <Skeleton className="w-2xs aspect-[3/4] mx-auto" key={index} />
          ))
        : products.map((product) => <ProductItem product={product} key={product.id} />)}
    </div>
  )
}
