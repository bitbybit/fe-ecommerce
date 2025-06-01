import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import ProductDetail from './product-card'

export default function Product(): ReactElement {
  useTitle('Product')
  return <ProductDetail />
}
