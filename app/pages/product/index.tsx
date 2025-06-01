import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import ProductDetail from './ProductDetail/ProductDetail'
import { Loading } from '~/components/Loading'
import { useProductData, PRODUCT_STATUS } from './hooks/useProductData'

export default function Product(): ReactElement {
  useTitle('Product')
  const { product, status } = useProductData()
  if (
    status !== PRODUCT_STATUS.READY ||
    !product ||
    !product?.description ||
    product.masterVariant.prices?.[0].value.centAmount === undefined
  )
    return <Loading />
  const name = product.name
  const description = product.description ?? name
  const price = product.masterVariant.prices?.[0].value.centAmount
  const images = product.masterVariant.images
  const discount = product.masterVariant.prices?.[0].discounted?.value.centAmount

  return <ProductDetail name={name} description={description} price={price} discount={discount} images={images} />
}
