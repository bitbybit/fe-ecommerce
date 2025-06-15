import { ctpApiClient, type CtpApiClient } from '~/api/client'
import { type Cart, type ClientResponse } from '@commercetools/platform-sdk'

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

  public async addProduct(productId: string, quantity: number = 1): Promise<ClientResponse<Cart>> {
    const cart = await this.getCart()

    return this.client
      .getCurrentCustomerBuilder()
      .carts()
      .withId({ ID: cart.id })
      .post({ body: { actions: [{ action: 'addLineItem', productId, quantity }], version: cart.version } })
      .execute()
  }

  public async removeProduct(productId: string, quantity: number = 1): Promise<ClientResponse<Cart>> {
    const cart = await this.getCart()
    const lineItemId = cart.lineItems.find((lineItem) => lineItem.productId === productId)?.id

    if (lineItemId === undefined) {
      throw new Error(`Could not find lineItem for product with ID ${productId}`)
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

    const cart = carts.body.results.find(
      ({ id, cartState }) => id === this.getCartIdFromStorage() && cartState === 'Active'
    )

    if (cart !== undefined) {
      return cart
    }

    const nonEmptyCart = carts.body.results.find(
      ({ lineItems, cartState }) => lineItems.length > 0 && cartState === 'Active'
    )

    if (nonEmptyCart !== undefined) {
      return nonEmptyCart
    }

    const activeCart = await this.client.getCurrentCustomerBuilder().activeCart().get().execute()

    return activeCart.body
  }

  private getCartIdFromStorage(): string | null {
    return localStorage.getItem(this.cartIdStorageKey)
  }

  private saveCartIdToStorage(id: string): void {
    localStorage.setItem(this.cartIdStorageKey, id)
  }
}

export const cartApi = new CartApi({ client: ctpApiClient })
