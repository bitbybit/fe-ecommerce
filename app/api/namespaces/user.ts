import { type Address, type ClientResponse, type Customer } from '@commercetools/platform-sdk'
import { formatDateForSdk } from '~/utils/formatDate'
import { ctpApiClient, type CtpApiClient } from '~/api/client'

type UserApiProps = {
  client: CtpApiClient
}

export class UserApi {
  private readonly client: CtpApiClient

  constructor({ client }: UserApiProps) {
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

  public async addCustomerAddress(address: Address, version: number): Promise<ClientResponse<Customer>> {
    return this.client.root
      .me()
      .post({
        body: {
          actions: [
            {
              action: 'addAddress',
              address
            }
          ],
          version
        }
      })
      .execute()
  }

  public async changeCustomerAddress(address: Address, version: number): Promise<ClientResponse<Customer>> {
    return this.client.root
      .me()
      .post({
        body: {
          actions: [
            {
              action: 'changeAddress',
              address,
              addressId: address.id
            }
          ],
          version
        }
      })
      .execute()
  }

  public async removeCustomerAddress(addressId: string, version: number): Promise<ClientResponse<Customer>> {
    return this.client.root
      .me()
      .post({
        body: {
          actions: [
            {
              action: 'removeAddress',
              addressId
            }
          ],
          version
        }
      })
      .execute()
  }

  public async setCustomerBillingAddress(addressId: string, version: number): Promise<ClientResponse<Customer>> {
    return this.client.root
      .me()
      .post({
        body: {
          actions: [
            {
              action: 'setDefaultBillingAddress',
              addressId
            }
          ],
          version
        }
      })
      .execute()
  }

  public async setCustomerShippingAddress(addressId: string, version: number): Promise<ClientResponse<Customer>> {
    return this.client.root
      .me()
      .post({
        body: {
          actions: [
            {
              action: 'setDefaultShippingAddress',
              addressId
            }
          ],
          version
        }
      })
      .execute()
  }
}

export const userApi = new UserApi({ client: ctpApiClient })
