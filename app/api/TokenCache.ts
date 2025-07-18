import { type TokenStore, type TokenCache } from '@commercetools/ts-client'

export class LocalStorageTokenCache implements TokenCache {
  private readonly key: string

  constructor(key: string) {
    this.key = key
  }

  private static isTokenStore(value: unknown): value is TokenStore {
    return (
      value !== null &&
      typeof value === 'object' &&
      'token' in value &&
      'expirationTime' in value &&
      typeof value.token === 'string' &&
      typeof value.expirationTime === 'number'
    )
  }

  public get(): TokenStore {
    const raw = globalThis.localStorage.getItem(this.key)
    const value: unknown = JSON.parse(String(raw))

    if (value === null) {
      return { token: '', expirationTime: 0 }
    }

    if (!LocalStorageTokenCache.isTokenStore(value)) {
      throw new Error('Token cache not found')
    }

    return value
  }

  public set(cache: TokenStore): void {
    globalThis.localStorage.setItem(this.key, JSON.stringify(cache))
  }

  public remove(): void {
    globalThis.localStorage.removeItem(this.key)
  }
}
