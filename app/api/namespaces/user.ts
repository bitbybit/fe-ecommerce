import { ctpApiClient, type CtpApiClient } from '~/api/client'

type UserApiProperties = {
  client: CtpApiClient
}

export class UserApi {
  private readonly client: CtpApiClient

  constructor({ client }: UserApiProperties) {
    this.client = client
  }
}

export const userApi = new UserApi({ client: ctpApiClient })
