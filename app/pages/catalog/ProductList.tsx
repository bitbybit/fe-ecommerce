import { type ReactElement } from 'react'
import { type ProductProjection } from '@commercetools/platform-sdk'
import { Skeleton } from '~/components/ui/Skeleton'
import { ProductItem } from './ProductItem'
import { CATALOG_STATUS } from './hooks/useCatalogData'
import { Sparkles } from 'lucide-react'

const SKELETON_COUNT = 8

export function ProductList({
  products,
  status
}: Readonly<{ products: ProductProjection[]; status: CATALOG_STATUS }>): ReactElement {
  const isNotReady = status !== CATALOG_STATUS.READY
  const isEmpty = !isNotReady && products.length === 0

  if (isEmpty) {
    return (
      <div className="w-full h-100 flex items-center justify-center">
        <div className="max-w-xs flex flex-col items-center justify-center gap-4 text-center">
          <Sparkles size={60} className="text-sky-200" />
          <p className="text-sm">We couldn’t find any products matching your search.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4 justify-evenly flex-wrap p-2 h-full w-full">
      {isNotReady
        ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <Skeleton className="w-2xs aspect-[3/4] mx-auto" key={index} />
          ))
        : products.map((product) => <ProductItem product={product} key={product.id} />)}
    </div>
  )
}
