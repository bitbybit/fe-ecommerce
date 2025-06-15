import { type ReactElement, useEffect } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { cartApi } from '~/api/namespaces/cart'
import { productApi } from '~/api/namespaces/product'
import { EmptyBasket } from './EmptyBasket'

export default function Routes(): ReactElement {
  useTitle('Cart')

  useEffect(() => {
    const cartExampleCalls = async (): Promise<void> => {
      const product = await productApi.getProductById('1a4e9d76-3577-42aa-910f-17e1d68c80cc')

      const cartAfterAdd = await cartApi.addProduct(product.body, 1)

      console.log(cartAfterAdd.body)

      const cartAfterRemove = await cartApi.removeProduct(product.body, 1)

      console.log(cartAfterRemove.body)
    }

    void cartExampleCalls()
  })

  return (
    <div>
      <EmptyBasket />
    </div>
  )
}
