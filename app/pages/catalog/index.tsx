import { useEffect, type ReactElement } from 'react'
import { productApi } from '~/api/namespaces/product'
import { useTitle } from '~/hooks/use-title'

export default function Routes(): ReactElement {
  useTitle('Catalog')

  useEffect(() => {
    productApi
      .getProducts()
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }, [])

  return <>Catalog</>
}
