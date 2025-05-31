import { type ReactElement } from 'react'
import { type ProductProjection } from '@commercetools/platform-sdk'
import { Skeleton } from '~/components/ui/Skeleton'
import { ProductItem } from './ProductItem'
import { CATALOG_STATUS } from './hooks/useCatalogData'

const SKELETON_COUNT = 8

export function ProductList({
  products,
  status
}: Readonly<{ products: ProductProjection[]; status: CATALOG_STATUS }>): ReactElement {
  const isNotReady = status !== CATALOG_STATUS.READY

  return (
    <div className="flex gap-4 flex-wrap">
      {isNotReady
        ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <Skeleton className="w-2xs aspect-[3/4] mx-auto" key={index} />
          ))
        : products.map((product) => <ProductItem product={product} key={product.id} />)}
    </div>
  )
}
