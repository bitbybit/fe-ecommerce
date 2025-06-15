import { ctpApiClient, type CtpApiClient } from '~/api/client'
import { type Cart, type ClientResponse, type ProductProjection } from '@commercetools/platform-sdk'

type CartApiProperties = {
  client: CtpApiClient
}

export class CartApi {
  private readonly client: CtpApiClient

  private readonly cartIdStorageKey = 'cart_id'
  private readonly currency = 'USD'

  constructor({ client }: CartApiProperties) {
    this.client = client
  }

  public async addProduct(product: ProductProjection, quantity: number = 1): Promise<ClientResponse<Cart>> {
    const cart = await this.getCart()

    return this.client
      .getCurrentCustomerBuilder()
      .carts()
      .withId({ ID: cart.id })
      .post({ body: { actions: [{ action: 'addLineItem', productId: product.id, quantity }], version: cart.version } })
      .execute()
  }

  public async removeProduct(product: ProductProjection, quantity: number = 1): Promise<ClientResponse<Cart>> {
    const cart = await this.getCart()
    const lineItemId = cart.lineItems.find((lineItem) => lineItem.productId === product.id)?.id

    if (lineItemId === undefined) {
      throw new Error(`Could not find lineItem for product with ID ${product.id}`)
    }

    return this.client
      .getCurrentCustomerBuilder()
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: { actions: [{ action: 'removeLineItem', lineItemId, quantity }], version: cart.version }
      })
      .execute()
  }

  public async getCart(): Promise<Cart> {
    const carts = await this.client.getCurrentCustomerBuilder().carts().get().execute()

    if (carts.body.results.length === 0) {
      const cart = await this.client
        .getCurrentCustomerBuilder()
        .carts()
        .post({ body: { currency: this.currency } })
        .execute()

      this.saveCartIdToStorage(cart.body.id)

      return cart.body
    }

    const cart = carts.body.results.find((cart) => cart.id === this.getCartIdFromStorage())

    if (cart === undefined) {
      throw new Error('Can not get cart')
    }

    return cart
  }

  private getCartIdFromStorage(): string | null {
    return localStorage.getItem(this.cartIdStorageKey)
  }

  private saveCartIdToStorage(id: string): void {
    localStorage.setItem(this.cartIdStorageKey, id)
  }
}

export const cartApi = new CartApi({ client: ctpApiClient })
