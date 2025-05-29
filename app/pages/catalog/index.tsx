import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import ProductList from './product-list'
// import { productApi } from '~/api/namespaces/product'

export default function Catalog(): ReactElement {
  useTitle('Catalog')

  // void productApi
  //   .filterProducts({
  //     'filter.query': ['categories.id:"b181673c-bb3c-4428-9c37-e4648541ae3f"','variants.attributes.color.key:"black"']
  //   })
  //   .then((data) => console.log(data))

  return <ProductList />
}
