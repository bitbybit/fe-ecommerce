import { ctpApiClient, type CtpApiClient } from '~/shared/api/client'
import { type ClientResponse, type ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'

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
}

export const productApi = new ProductApi({ client: ctpApiClient })
