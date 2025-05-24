import type { ReactElement } from 'react'
import { useAppSelector } from '~/store/hooks'
import Product from '../product'
import { PRODUCT_STATUS } from '~/store/product'
import { Skeleton } from '~/components/ui/skeleton'

export default function ProductList(): ReactElement {
  const { products, status } = useAppSelector((state) => state.product)
  const isErrorOrLoading = status === PRODUCT_STATUS.LOADING || status === PRODUCT_STATUS.ERROR

  return (
    <div className="flex gap-4 flex-wrap">
      {isErrorOrLoading
        ? Array.from({ length: 8 }).map(() => <Skeleton className="w-xs h-[470px] mx-auto" />)
        : products.map((product) => <Product product={product} />)}
    </div>
  )
}
