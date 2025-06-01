import { type ClientResponse, type Customer } from '@commercetools/platform-sdk'
import { ctpApiClient, type CtpApiClient } from '~/api/client'

type UserApiProperties = {
  client: CtpApiClient
}

export class UserApi {
  private readonly client: CtpApiClient

  constructor({ client }: UserApiProperties) {
    this.client = client
  }

  public async changeCustomerPassword(
    currentPassword: string,
    newPassword: string,
    version: number
  ): Promise<ClientResponse<Customer>> {
    return this.client.root
      .me()
      .password()
      .post({
        body: {
          currentPassword,
          newPassword,
          version
        }
      })
      .execute()
  }
}

export const userApi = new UserApi({ client: ctpApiClient })
