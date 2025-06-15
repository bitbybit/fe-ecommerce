import { type ReactElement, useEffect } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { cartApi } from '~/api/namespaces/cart'
import { productApi } from '~/api/namespaces/product'

export default function Routes(): ReactElement {
  useTitle('Cart')

  useEffect(() => {
    const cartExampleCalls = async (): Promise<void> => {
      // TODO: prices should not be tied to any country
      const product = await productApi.getProductById('fd15bf1a-59ac-47d9-8172-3a7621c6740d')

      const cartAfterAdd = await cartApi.addProduct(product.body, 1)

      console.log(cartAfterAdd.body)

      const cartAfterRemove = await cartApi.removeProduct(product.body, 1)

      console.log(cartAfterRemove.body)
    }

    void cartExampleCalls()
  })

  return <>Cart1</>
}
