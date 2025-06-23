import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { useFetchCart } from '~/hooks/useFetchCart'
import { Loading } from '~/components/Loading'
import { ProductDetailBody } from './ProductDetail/ProductDetailBody'
import { useProductData, PRODUCT_STATUS } from './hooks/useProductData'

export default function Product(): ReactElement {
  useTitle('Product')
  useFetchCart()
  const { categories, product, status } = useProductData()

  if (status !== PRODUCT_STATUS.READY) {
    return <Loading />
  }

  return <ProductDetailBody product={product} categories={categories} />
}
