import { useEffect, type ReactElement } from 'react'
import { type MetaFunction } from 'react-router'
import { productApi } from '~/api/namespaces/product'

export function meta(): ReturnType<MetaFunction> {
  return [{ title: 'Catalog' }]
}

export default function Routes(): ReactElement {
  useEffect(() => {
    productApi
      .getProducts()
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }, [])

  return <>Catalog</>
}
