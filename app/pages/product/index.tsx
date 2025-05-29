import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import ProductCard from './product-card'

export default function Product(): ReactElement {
  useTitle('Product')
  return <ProductCard />
}
