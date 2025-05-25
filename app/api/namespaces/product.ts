import { ctpApiClient, type CtpApiClient } from '~/api/client'
import {
  type ClientResponse,
  type ProductProjectionPagedQueryResponse,
  type ProductProjection
} from '@commercetools/platform-sdk'

type ProductApiProperties = {
  client: CtpApiClient
}

class ProductApi {
  private readonly client: CtpApiClient

  constructor({ client }: ProductApiProperties) {
    this.client = client
  }

  public async getProducts(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    return this.client.root.productProjections().get().execute()
  }

  public async getProductByID(): Promise<ClientResponse<ProductProjection>> {
    return this.client.root.productProjections().withId({ ID: '424783fa-d6b2-40cb-97fd-1b5f7b4ee9fd' }).get().execute()
  }
}

export const productApi = new ProductApi({ client: ctpApiClient })
