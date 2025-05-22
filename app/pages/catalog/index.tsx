import { type ReactElement } from 'react'
// import { productApi } from '~/api/namespaces/product'
import { useTitle } from '~/hooks/use-title'
import { useAppDispatch } from '~/store/hooks'
import { getProducts } from '~/store/product'

export default function Catalog(): ReactElement {
  useTitle('Catalog')
  const dispatch = useAppDispatch()

  void dispatch(getProducts({ limit: 30 }))
    .unwrap()
    .then((data) => console.log(data))

  return <>Catalog</>
}
