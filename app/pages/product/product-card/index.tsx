import type { ReactElement } from 'react'
import ProductDetail from './ProductDetail'
import { Loading } from '~/components/Loading'
import { useProductData } from '../hooks/useProductData'

export default function ProductCardContainer(): ReactElement {
  const { name, description, price, discount, images } = useProductData()

  if (!name || !description || price === undefined) return <Loading />

  return <ProductDetail name={name} description={description} price={price} discount={discount} images={images} />
}
