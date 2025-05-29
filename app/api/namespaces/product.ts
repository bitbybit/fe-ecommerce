import { ctpApiClient, type CtpApiClient } from '~/api/client'
import {
  type ClientResponse,
  type ProductProjectionPagedQueryResponse,
  type ByProjectKeyProductProjectionsRequestBuilder,
  type ProductProjectionPagedSearchResponse,
  type ByProjectKeyProductProjectionsSearchRequestBuilder
} from '@commercetools/platform-sdk'

type ProductApiProperties = {
  client: CtpApiClient
}

export type ProductListQueryParameters = NonNullable<
  Parameters<ByProjectKeyProductProjectionsRequestBuilder['get']>[0]
>['queryArgs']

export type ProductsFilterQueryParameters = NonNullable<
  Parameters<ByProjectKeyProductProjectionsSearchRequestBuilder['get']>[0]
>['queryArgs']

export class ProductApi {
  private readonly client: CtpApiClient

  constructor({ client }: ProductApiProperties) {
    this.client = client
  }

  public async getProducts(
    parameters: ProductListQueryParameters
  ): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    return this.client.root.productProjections().get({ queryArgs: parameters }).execute()
  }

  public async filterProducts(
    parameters: ProductsFilterQueryParameters
  ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    return this.client.root
      .productProjections()
      .search()
      .get({
        queryArgs: { ...parameters, limit: 100 }
      })
      .execute()
  }
}

export const productApi = new ProductApi({ client: ctpApiClient })
