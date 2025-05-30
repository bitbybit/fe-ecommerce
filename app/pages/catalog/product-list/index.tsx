import { useEffect, type ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { getProducts, PRODUCT_STATUS } from '~/store/product'
import { Skeleton } from '~/components/ui/skeleton'
import { ProductItem } from './product-item'
import type { ProductProjection } from '@commercetools/platform-sdk'
const SKELETON_COUNT = 8

export default function ProductList({ filteredProducts }: { filteredProducts?: ProductProjection[] }): ReactElement {
  const dispatch = useAppDispatch()

  const { products, status } = useAppSelector((state) => state.product)
  const isNotReady = status !== PRODUCT_STATUS.READY

  useEffect(() => void dispatch(getProducts()).unwrap(), [dispatch])
  const displayProducts = filteredProducts && filteredProducts.length > 0 ? filteredProducts : products

  return (
    <div className="flex gap-4 flex-wrap">
      {isNotReady
        ? Array.from({ length: SKELETON_COUNT }).map(() => <Skeleton className="w-2xs aspect-[3/4] mx-auto" />)
        : displayProducts.map((product) => <ProductItem product={product} />)}
    </div>
  )
}
