import type { ReactElement } from 'react'
import ProductDetail from './ProductDetail'
import { useProductData } from '../hooks/UseProductData'
import { Loading } from '~/components/Loading'

export default function ProductCardContainer(): ReactElement {
  const { name, description, price, discount, images } = useProductData()

  if (!name || !description || price === undefined) return <Loading />

  return <ProductDetail name={name} description={description} price={price} discount={discount} images={images} />
}
