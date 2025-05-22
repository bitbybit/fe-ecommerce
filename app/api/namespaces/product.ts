import { ctpApiClient, type CtpApiClient } from '~/api/client'
import { type ClientResponse, type ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'

type ProductApiProperties = {
  client: CtpApiClient
}

export type ProductProjectionQueryParameters = {
  staged?: boolean
  priceCurrency?: string
  priceCountry?: string
  priceCustomerGroup?: string
  priceCustomerGroupAssignments?: string | string[]
  priceChannel?: string
  localeProjection?: string | string[]
  storeProjection?: string
  expand?: string | string[]
  sort?: string | string[]
  limit?: number
  offset?: number
  withTotal?: boolean
  where?: string | string[]
}

export class ProductApi {
  private readonly client: CtpApiClient

  constructor({ client }: ProductApiProperties) {
    this.client = client
  }

  public async getProducts(
    parameters: ProductProjectionQueryParameters
  ): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    return this.client.root.productProjections().get({ queryArgs: parameters }).execute()
  }
}

export const productApi = new ProductApi({ client: ctpApiClient })
