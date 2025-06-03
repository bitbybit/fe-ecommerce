import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { Loading } from '~/components/Loading'
import ProductDetailBody from './ProductDetail/ProductDetailBody'
import { useProductData, PRODUCT_STATUS } from './hooks/useProductData'

export default function Product(): ReactElement {
  useTitle('Product')

  const { product, status } = useProductData()

  if (status !== PRODUCT_STATUS.READY) {
    return <Loading />
  }

  return <ProductDetailBody product={product} />
}
