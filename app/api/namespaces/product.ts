import { ctpApiClient, type CtpApiClient } from '~/api/client'
import {
  type ClientResponse,
  type ProductProjectionPagedQueryResponse,
  type ByProjectKeyProductProjectionsRequestBuilder,
  type ProductProjection
} from '@commercetools/platform-sdk'

type ProductApiProperties = {
  client: CtpApiClient
}

export type ProductListQueryParameters = NonNullable<
  Parameters<ByProjectKeyProductProjectionsRequestBuilder['get']>[0]
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

  //TODO: change id
  public async getProductByID(): Promise<ClientResponse<ProductProjection>> {
    return this.client.root.productProjections().withId({ ID: '424783fa-d6b2-40cb-97fd-1b5f7b4ee9fd' }).get().execute()
  }
}

export const productApi = new ProductApi({ client: ctpApiClient })
