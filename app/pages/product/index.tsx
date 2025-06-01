import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import ProductCardContainer from './product-card/index.tsx'

export default function Product(): ReactElement {
  useTitle('Product')
  return <ProductCardContainer />
}
