import { type AuthMiddlewareOptions, ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/ts-client'
import {
  type ByProjectKeyRequestBuilder,
  type ClientResponse,
  createApiBuilderFromCtpClient,
  type Customer,
  type CustomerSignInResult
} from '@commercetools/platform-sdk'
import { SessionStorageTokenCache } from '~/api/TokenCache'

type ApiClientProperties = {
  authUri?: string
  baseUri?: string
  clientId?: string
  clientSecret?: string
  projectKey?: string
  scopes?: string
}

export enum CUSTOMER_ADDRESS_TYPE {
  BILLING = 'BILLING',
  DEFAULT = 'DEFAULT',
  SHIPPING = 'SHIPPING'
}

export type CustomerAddress = {
  city: string
  country: string
  firstName: string
  lastName: string
  postalCode: string
  streetName: string
  type: CUSTOMER_ADDRESS_TYPE
}

type SignupPayload = {
  addresses: Omit<CustomerAddress, 'firstName' | 'lastName'>[]
  dateOfBirth: string
  email: string
  firstName: string
  lastName: string
  password: string
}

export class CtpApiClient {
  private readonly authUri: string
  private readonly baseUri: string
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly projectKey: string
  private readonly scopes: string

  private readonly tokenCache = new SessionStorageTokenCache('token')

  private readonly public: ByProjectKeyRequestBuilder
  private protected?: ByProjectKeyRequestBuilder
  private current: ByProjectKeyRequestBuilder

  constructor({
    authUri = String(import.meta.env.VITE_CTP_AUTH_URL),
    baseUri = String(import.meta.env.VITE_CTP_API_URL),
    clientId = String(import.meta.env.VITE_CTP_CLIENT_ID),
    clientSecret = String(import.meta.env.VITE_CTP_CLIENT_SECRET),
    projectKey = String(import.meta.env.VITE_CTP_PROJECT_KEY),
    scopes = String(import.meta.env.VITE_CTP_SCOPES)
  }: ApiClientProperties = {}) {
    this.authUri = authUri
    this.baseUri = baseUri
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.projectKey = projectKey
    this.scopes = scopes

    this.public = this.createPublic()

    if (this.hasToken) {
      this.protected = this.createPublic(true)
      this.current = this.protected
    } else {
      this.current = this.public
    }
  }

  public get root(): ByProjectKeyRequestBuilder {
    return this.current
  }

  public get hasToken(): boolean {
    try {
      return this.tokenCache.get().token !== ''
    } catch {
      return false
    }
  }

  public async login(email: string, password: string): Promise<ClientResponse<Customer>> {
    this.logout()

    this.protected = this.createProtected(email, password)
    this.current = this.protected

    return await this.getCurrentCustomer()
  }

  public logout(): void {
    this.tokenCache.remove()
    this.current = this.public
    this.protected = undefined
  }

  public async getCurrentCustomer(): Promise<ClientResponse<Customer>> {
    return await this.current.me().get().execute()
  }

  public async signup(payload: SignupPayload): Promise<ClientResponse<CustomerSignInResult>> {
    this.logout()

    const billingAddressIndex = payload.addresses.findIndex(({ type }) => type === CUSTOMER_ADDRESS_TYPE.BILLING)
    const shippingAddressIndex = payload.addresses.findIndex(({ type }) => type === CUSTOMER_ADDRESS_TYPE.SHIPPING)

    return this.current
      .me()
      .signup()
      .post({
        body: {
          addresses: payload.addresses.map(
            (address): Omit<CustomerAddress, 'type'> => ({
              city: address.city,
              country: address.country,
              firstName: payload.firstName,
              lastName: payload.lastName,
              postalCode: address.postalCode,
              streetName: address.streetName
            })
          ),
          dateOfBirth: payload.dateOfBirth,
          defaultBillingAddress: billingAddressIndex === -1 ? undefined : billingAddressIndex,
          defaultShippingAddress: shippingAddressIndex === -1 ? undefined : shippingAddressIndex,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          password: payload.password
        }
      })
      .execute()
  }

  private getHttpOptions(): HttpMiddlewareOptions {
    return {
      host: this.baseUri,
      httpClient: fetch,
      includeOriginalRequest: true,
      includeRequestInErrorResponse: true
    }
  }

  private createPublic(withTokenCache: boolean = false): ByProjectKeyRequestBuilder {
    const authOptions: AuthMiddlewareOptions = {
      credentials: { clientId: this.clientId, clientSecret: this.clientSecret },
      host: this.authUri,
      httpClient: fetch,
      projectKey: this.projectKey,
      scopes: [this.scopes]
    }

    if (withTokenCache) {
      authOptions.tokenCache = this.tokenCache
    }

    const client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withClientCredentialsFlow(authOptions)
      .withHttpMiddleware(this.getHttpOptions())
      .withLoggerMiddleware()
      .build()

    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: this.projectKey
    })
  }

  private createProtected(email: string, password: string): ByProjectKeyRequestBuilder {
    const client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withPasswordFlow({
        credentials: { clientId: this.clientId, clientSecret: this.clientSecret, user: { username: email, password } },
        host: this.authUri,
        httpClient: fetch,
        projectKey: this.projectKey,
        scopes: [this.scopes],
        tokenCache: this.tokenCache
      })
      .withHttpMiddleware(this.getHttpOptions())
      .withLoggerMiddleware()
      .build()

    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: this.projectKey
    })
  }
}

export const ctpApiClient = new CtpApiClient()
