import { useEffect, type ReactElement } from 'react'
import { productApi } from '~/shared/api/namespaces/product'

export function Catalog(): ReactElement {
  useEffect(() => {
    productApi
      .getProducts()
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }, [])

  return <>Catalog</>
}
