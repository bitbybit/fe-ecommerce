import { ctpApiClient, type CtpApiClient } from '~/api/client'
import { type Cart, type ClientResponse, type DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk'

type CartApiProps = {
  client: CtpApiClient
}

export class CartApi {
  private readonly client: CtpApiClient

  private readonly cartIdStorageKey = 'cart_id'
  private readonly currency = 'USD'

  constructor({ client }: CartApiProps) {
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

  public async updateProductQuantity(productId: string, quantity: number): Promise<ClientResponse<Cart>> {
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
        body: { actions: [{ action: 'changeLineItemQuantity', lineItemId, quantity }], version: cart.version }
      })
      .execute()
  }

  public async clearCart(): Promise<Cart> {
    let cart = await this.getCart()

    for (const { id, quantity } of cart.lineItems) {
      const { body } = await this.client
        .getCurrentCustomerBuilder()
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: { actions: [{ action: 'removeLineItem', lineItemId: id, quantity }], version: cart.version }
        })
        .execute()

      cart = body
    }

    return cart
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

  public async getDiscountCodes(): Promise<ClientResponse<DiscountCodePagedQueryResponse>> {
    return this.client.root
      .discountCodes()
      .get({ queryArgs: { where: 'isActive = true' } })
      .execute()
  }

  public async applyDiscountCode(code: string): Promise<ClientResponse<Cart>> {
    const cart = await this.getCart()

    return this.client
      .getCurrentCustomerBuilder()
      .carts()
      .withId({ ID: cart.id })
      .post({ body: { actions: [{ action: 'addDiscountCode', code }], version: cart.version } })
      .execute()
  }

  private getCartIdFromStorage(): string | null {
    return localStorage.getItem(this.cartIdStorageKey)
  }

  private saveCartIdToStorage(id: string): void {
    localStorage.setItem(this.cartIdStorageKey, id)
  }
}

export const cartApi = new CartApi({ client: ctpApiClient })
