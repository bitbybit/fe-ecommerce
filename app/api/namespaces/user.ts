import { type ClientResponse, type Customer } from '@commercetools/platform-sdk'
import { formatDateForSdk } from '~/utils/formatDate'
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

  public async changeCustomerData(
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    email: string,
    version: number
  ): Promise<ClientResponse<Customer>> {
    return this.client.root
      .me()
      .post({
        body: {
          actions: [
            {
              action: 'setFirstName',
              firstName
            },
            {
              action: 'setLastName',
              lastName
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: formatDateForSdk(dateOfBirth)
            },
            {
              action: 'changeEmail',
              email
            }
          ],
          version
        }
      })
      .execute()
  }
}

export const userApi = new UserApi({ client: ctpApiClient })
