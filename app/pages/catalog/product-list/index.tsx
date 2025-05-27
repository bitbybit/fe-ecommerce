import type { ReactElement } from 'react'
import { useAppSelector } from '~/store/hooks'
import { PRODUCT_STATUS } from '~/store/product'
import { Skeleton } from '~/components/ui/skeleton'
import Product from './product-item'

export default function ProductList(): ReactElement {
  const { products, status } = useAppSelector((state) => state.product)
  const isNotReady = status !== PRODUCT_STATUS.READY
  const SKELETON_COUNT = 8

  return (
    <div className="flex gap-4 flex-wrap">
      {isNotReady
        ? Array.from({ length: SKELETON_COUNT }).map(() => <Skeleton className="w-2xs aspect-[3/4] mx-auto" />)
        : products.map((product) => <Product product={product} />)}
    </div>
  )
}
