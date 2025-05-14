import { type HttpMiddlewareOptions, ClientBuilder, type AuthMiddlewareOptions } from '@commercetools/ts-client'
import {
  type ByProjectKeyRequestBuilder,
  type ClientResponse,
  createApiBuilderFromCtpClient,
  type Customer,
  type CustomerSignInResult
} from '@commercetools/platform-sdk'
import { SessionStorageTokenCache } from '~/api/token-cache'

type ApiClientProperties = {
  authUri?: string
  baseUri?: string
  clientId?: string
  clientSecret?: string
  projectKey?: string
  scopes?: string
}

type SignupPayload = {
  city: string
  country: string
  dateOfBirth: string
  email: string
  firstName: string
  lastName: string
  password: string
  postalCode: string
  streetName: string
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
  private customer?: Customer

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

    if (this.tokenCache.get()) {
      this.protected = this.createPublic(true)
      this.current = this.protected
    } else {
      this.current = this.public
    }
  }

  public get isAuth(): boolean {
    return this.customer !== undefined
  }

  public get root(): ByProjectKeyRequestBuilder {
    return this.current
  }

  public async login(email: string, password: string): Promise<ClientResponse<Customer>> {
    this.protected = this.createProtected(email, password)

    const response = await this.protected.me().get().execute()
    this.customer = response.body

    this.current = this.protected

    return response
  }

  public logout(): void {
    this.tokenCache.remove()
    this.current = this.public
  }

  public async signup({
    city,
    country,
    dateOfBirth,
    email,
    firstName,
    lastName,
    password,
    postalCode,
    streetName
  }: SignupPayload): Promise<ClientResponse<CustomerSignInResult>> {
    return this.public
      .me()
      .signup()
      .post({
        body: {
          dateOfBirth,
          email,
          firstName,
          lastName,
          password,
          addresses: [
            {
              city,
              country,
              firstName,
              lastName,
              postalCode,
              streetName
            }
          ]
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
