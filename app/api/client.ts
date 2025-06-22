import { ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/ts-client'
import {
  type ByProjectKeyMeRequestBuilder,
  type ApiRequest,
  type ByProjectKeyRequestBuilder,
  type ClientResponse,
  createApiBuilderFromCtpClient,
  type Customer,
  type CustomerSignInResult
} from '@commercetools/platform-sdk'
import { LocalStorageTokenCache } from '~/api/TokenCache'

type ApiClientProps = {
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

export const LANG = 'en-US'

export class CtpApiClient {
  private readonly authUri: string
  private readonly baseUri: string
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly projectKey: string
  private readonly scopes: string

  private readonly publicTokenCache = new LocalStorageTokenCache('public')
  private readonly protectedTokenCache = new LocalStorageTokenCache('protected')

  private readonly anonymousIdStorageKey = 'anonymous_id'

  private publicInstance: ByProjectKeyRequestBuilder
  private protectedInstance?: ByProjectKeyRequestBuilder
  private currentInstance: ByProjectKeyRequestBuilder

  constructor({
    authUri = String(import.meta.env.VITE_CTP_AUTH_URL),
    baseUri = String(import.meta.env.VITE_CTP_API_URL),
    clientId = String(import.meta.env.VITE_CTP_CLIENT_ID),
    clientSecret = String(import.meta.env.VITE_CTP_CLIENT_SECRET),
    projectKey = String(import.meta.env.VITE_CTP_PROJECT_KEY),
    scopes = String(import.meta.env.VITE_CTP_SCOPES)
  }: ApiClientProps = {}) {
    this.authUri = authUri
    this.baseUri = baseUri
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.projectKey = projectKey
    this.scopes = scopes

    this.publicInstance = this.createPublicInstance()

    if (this.hasToken) {
      this.protectedInstance = this.createProtectedWithTokenInstance()
      this.currentInstance = this.protectedInstance ?? this.publicInstance
    } else {
      this.currentInstance = this.publicInstance
    }
  }

  public get root(): ByProjectKeyRequestBuilder {
    return this.currentInstance
  }

  public get hasToken(): boolean {
    try {
      return this.protectedTokenCache.get().token !== ''
    } catch {
      return false
    }
  }

  private static isAnonymousIdError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      error.statusCode === 400 &&
      'message' in error &&
      typeof error.message === 'string' &&
      error.message.includes('anonymousId')
    )
  }

  public async login(email: string, password: string): Promise<ClientResponse<Customer>> {
    const request: () => ApiRequest<CustomerSignInResult> = () =>
      this.publicInstance
        .me()
        .login()
        .post({
          body: {
            email,
            password,
            activeCartSignInMode: 'UseAsNewActiveCustomerCart',
            updateProductData: true
          }
        })

    try {
      await request().execute()
    } catch (error) {
      await this.handleAuthError<CustomerSignInResult>({ error, request })
    }

    this.protectedInstance = this.createProtectedWithCredentialsInstance(email, password)
    this.currentInstance = this.protectedInstance

    return await this.getCurrentCustomer()
  }

  public logout(): void {
    this.protectedTokenCache.remove()
    this.publicTokenCache.remove()
    this.publicInstance = this.createPublicInstance()
    this.protectedInstance = undefined
    this.currentInstance = this.publicInstance
  }

  public getCurrentCustomerBuilder(): ByProjectKeyMeRequestBuilder {
    return this.currentInstance.me()
  }

  public async getCurrentCustomer(): Promise<ClientResponse<Customer>> {
    return await this.getCurrentCustomerBuilder().get().execute()
  }

  public async signup(payload: SignupPayload): Promise<ClientResponse<CustomerSignInResult>> {
    const billingAddressIndex = payload.addresses.findIndex(({ type }) => type === CUSTOMER_ADDRESS_TYPE.BILLING)
    const shippingAddressIndex = payload.addresses.findIndex(({ type }) => type === CUSTOMER_ADDRESS_TYPE.SHIPPING)

    const request: () => ApiRequest<CustomerSignInResult> = () =>
      this.publicInstance
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

    try {
      return await request().execute()
    } catch (error) {
      return await this.handleAuthError<CustomerSignInResult>({ error, request })
    }
  }

  private getHttpOptions(): HttpMiddlewareOptions {
    return {
      host: this.baseUri,
      httpClient: fetch,
      includeOriginalRequest: true,
      includeRequestInErrorResponse: true
    }
  }

  private createPublicInstance(): ByProjectKeyRequestBuilder {
    const anonymousId = this.getOrCreateAnonymousId()

    const client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withAnonymousSessionFlow({
        credentials: {
          clientId: this.clientId,
          clientSecret: this.clientSecret,
          anonymousId
        },
        host: this.authUri,
        httpClient: fetch,
        projectKey: this.projectKey,
        scopes: [this.scopes],
        tokenCache: this.publicTokenCache
      })
      .withHttpMiddleware(this.getHttpOptions())
      .withLoggerMiddleware()
      .build()

    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: this.projectKey
    })
  }

  private createProtectedWithCredentialsInstance(email: string, password: string): ByProjectKeyRequestBuilder {
    const client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withPasswordFlow({
        credentials: { clientId: this.clientId, clientSecret: this.clientSecret, user: { username: email, password } },
        host: this.authUri,
        httpClient: fetch,
        projectKey: this.projectKey,
        scopes: [this.scopes],
        tokenCache: this.protectedTokenCache
      })
      .withHttpMiddleware(this.getHttpOptions())
      .withLoggerMiddleware()
      .build()

    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: this.projectKey
    })
  }

  private createProtectedWithTokenInstance(): ByProjectKeyRequestBuilder | undefined {
    const refreshToken = this.getRefreshToken()

    if (refreshToken === undefined) {
      this.logout()
      return undefined
    }

    const client = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withRefreshTokenFlow({
        credentials: { clientId: this.clientId, clientSecret: this.clientSecret },
        host: this.authUri,
        httpClient: fetch,
        projectKey: this.projectKey,
        tokenCache: this.protectedTokenCache,
        refreshToken
      })
      .withHttpMiddleware(this.getHttpOptions())
      .withLoggerMiddleware()
      .build()

    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: this.projectKey
    })
  }

  private async handleAuthError<T>({
    error,
    request
  }: {
    error: unknown
    request: () => ApiRequest<T>
  }): Promise<ClientResponse<T>> {
    if (!CtpApiClient.isAnonymousIdError(error)) {
      throw error
    }

    console.log('Anonymous ID is already in use. Creating new anonymous ID...')

    this.logout()
    return await request().execute()
  }

  private getRefreshToken(): string | undefined {
    try {
      return this.protectedTokenCache.get().refreshToken
    } catch {
      this.logout()
      return undefined
    }
  }

  private getOrCreateAnonymousId(): string {
    let id = this.getAnonymousIdFromStorage()

    if (id === null || !this.hasToken) {
      id = crypto.randomUUID()
      this.saveAnonymousIdToStorage(id)
    }

    return id
  }

  private getAnonymousIdFromStorage(): string | null {
    return localStorage.getItem(this.anonymousIdStorageKey)
  }

  private saveAnonymousIdToStorage(id: string): void {
    localStorage.setItem(this.anonymousIdStorageKey, id)
  }
}

export const ctpApiClient = new CtpApiClient()
