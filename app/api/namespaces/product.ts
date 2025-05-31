import { ctpApiClient, type CtpApiClient } from '~/api/client'
import {
  type ClientResponse,
  type ProductProjectionPagedQueryResponse,
  type ByProjectKeyProductProjectionsSearchRequestBuilder,
  type AttributeDefinition
} from '@commercetools/platform-sdk'

type ProductApiProperties = {
  client: CtpApiClient
}

export type ProductListFilter = {
  label: string
  type: AttributeDefinition['type']['name'] | 'range'
  options: { value: string | number; label: string }[]
}

export type ProductListQueryParameters = NonNullable<
  Parameters<ByProjectKeyProductProjectionsSearchRequestBuilder['get']>[0]
>['queryArgs']

export type ProductListAppliedFilters = {
  key: string
  type: ProductListFilter['type']
  value: string
}[]

export class ProductApi {
  private readonly client: CtpApiClient

  constructor({ client }: ProductApiProperties) {
    this.client = client
  }

  private static attributesToFilter({ label, type }: AttributeDefinition): ProductListFilter {
    const options: { value: string; label: string }[] =
      type.name === 'set' && 'values' in type.elementType
        ? type.elementType.values.map((value) => ({
            value: value.key,
            label: typeof value.label === 'object' && 'en-US' in value.label ? value.label['en-US'] : 'Unknown label'
          }))
        : []

    return {
      label: label['en-US'],
      type: type.name,
      options
    }
  }

  public async getProducts(
    parameters: ProductListQueryParameters,
    filters: ProductListAppliedFilters = []
  ): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    // TODO: convert filters to commercetool format
    console.log('getProducts filters', filters)

    return this.client.root.productProjections().search().get({ queryArgs: parameters }).execute()
  }

  public async getFilters(): Promise<ProductListFilter[]> {
    const attributes: Map<AttributeDefinition['name'], AttributeDefinition> = new Map()
    const types = await this.client.root
      .productTypes()
      .get({ queryArgs: { limit: 100 } })
      .execute()

    for (const type of types.body.results) {
      for (const attribute of type.attributes ?? []) {
        if (!attributes.has(attribute.name) && attribute.isSearchable) {
          attributes.set(attribute.name, attribute)
        }
      }
    }

    const result = [...attributes.values()].map((attribute) => ProductApi.attributesToFilter(attribute))
    const priceFacetKey = 'variants.price.centAmount'
    const facets = await this.client.root
      .productProjections()
      .search()
      .get({ queryArgs: { facet: `${priceFacetKey}: range(0 to *)`, limit: 0 } })
      .execute()

    for (const [key, facet] of Object.entries(facets.body?.facets ?? {})) {
      if (key !== priceFacetKey || !('ranges' in facet) || facet.ranges.length === 0) {
        continue
      }

      result.push({
        label: 'Price',
        type: 'range',
        options: [facet.ranges?.[0]?.min ?? 0, facet?.ranges?.[0]?.max ?? 0].map((value) => ({
          value,
          label: String(value)
        }))
      })
    }

    return result
  }
}

export const productApi = new ProductApi({ client: ctpApiClient })
