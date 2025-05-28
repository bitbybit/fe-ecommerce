import { useEffect, type ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { getProducts, PRODUCT_STATUS } from '~/store/product'
import { Skeleton } from '~/components/ui/skeleton'
import { ProductItem } from './product-item'

export default function ProductList(): ReactElement {
  const dispatch = useAppDispatch()

  const { products, status } = useAppSelector((state) => state.product)
  const isNotReady = status !== PRODUCT_STATUS.READY
  const SKELETON_COUNT = 8

  useEffect(() => void dispatch(getProducts()).unwrap(), [dispatch])

  return (
    <div className="flex gap-4 flex-wrap">
      {isNotReady
        ? Array.from({ length: SKELETON_COUNT }).map(() => <Skeleton className="w-2xs aspect-[3/4] mx-auto" />)
        : products.map((product) => <ProductItem product={product} />)}
    </div>
  )
}
