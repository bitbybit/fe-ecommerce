import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import ProductDetail from './ProductDetail/ProductDetail'
import { Loading } from '~/components/Loading'
import { useProductData, PRODUCT_STATUS } from './hooks/useProductData'

export default function Product(): ReactElement {
  useTitle('Product')
  const { product, status } = useProductData()

  if (status !== PRODUCT_STATUS.READY) {
    return <Loading />
  }

  return <ProductDetail product={product} />
}
