import { ctpApiClient, type CtpApiClient } from '~/api/client'
import {
  type ClientResponse,
  type ByProjectKeyProductProjectionsSearchRequestBuilder,
  type AttributeDefinition,
  type ProductProjectionPagedSearchResponse,
  type ProductTypePagedQueryResponse
} from '@commercetools/platform-sdk'

type ProductApiProperties = {
  client: CtpApiClient
}

export type ProductListFilterOption<T> = {
  value: T
  label: string
}

export type ProductListFilterBase = {
  key: string
  label: string
}

export type ProductListFilterFromAttributes = {
  options: ProductListFilterOption<string>[]
  type: AttributeDefinition['type']['name']
} & ProductListFilterBase

export type ProductListFilterFromFacets = {
  options: ProductListFilterOption<number>[]
  type: 'range'
} & ProductListFilterBase

export type ProductListFilter = ProductListFilterFromAttributes | ProductListFilterFromFacets

export type ProductListQueryParameters = NonNullable<
  Parameters<ByProjectKeyProductProjectionsSearchRequestBuilder['get']>[0]
>['queryArgs']

export type ProductListAppliedFilters = ((
  | {
      type: ProductListFilterFromAttributes['type']
      value: ProductListFilterFromAttributes['options'][0]['value']
    }
  | {
      type: ProductListFilterFromFacets['type']
      value: [ProductListFilterFromFacets['options'][0]['value'], ProductListFilterFromFacets['options'][0]['value']]
    }
) & { key: string })[]

export class ProductApi {
  private readonly client: CtpApiClient

  constructor({ client }: ProductApiProperties) {
    this.client = client
  }

  private static attributesToFilter({ label, type, name }: AttributeDefinition): ProductListFilter {
    const options: ProductListFilterFromAttributes['options'] =
      type.name === 'set' && 'values' in type.elementType
        ? type.elementType.values.map((value) => ({
            value: value.key,
            label: typeof value.label === 'object' && 'en-US' in value.label ? value.label['en-US'] : 'Unknown label'
          }))
        : []

    return {
      key: name,
      label: label['en-US'],
      options,
      type: type.name
    }
  }

  private static appliedFiltersToQueryArgument(filters: ProductListAppliedFilters): string {
    let result: string = ''

    for (const { type, key, value } of filters) {
      switch (type) {
        case 'set': {
          result += `variants.attributes.${key}.key:"${value}"`
          break
        }

        case 'range': {
          result += `variants.${key}.centAmount:range(${value[0]} to ${value[1]})`
          break
        }

        // TODO: implement
        case 'boolean': {
          result += ''
          break
        }

        default: {
          result += `variants.attributes.${key}:"${value}"`
          break
        }
      }
    }

    return result
  }

  public async getProducts(
    parameters: ProductListQueryParameters,
    filters: ProductListAppliedFilters = []
  ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    return this.client.root
      .productProjections()
      .search()
      .get({ queryArgs: { ...parameters, filter: ProductApi.appliedFiltersToQueryArgument(filters) } })
      .execute()
  }

  public async getFilters(): Promise<ProductListFilter[]> {
    const attributes: Map<AttributeDefinition['name'], AttributeDefinition> = new Map()

    const types = await this.getTypes()

    for (const type of types.body.results) {
      for (const attribute of type.attributes ?? []) {
        if (!attributes.has(attribute.name) && attribute.isSearchable) {
          attributes.set(attribute.name, attribute)
        }
      }
    }

    const result = [...attributes.values()].map((attribute) => ProductApi.attributesToFilter(attribute))

    const priceKey = 'price'
    const priceFacetKey = `variants.${priceKey}.centAmount`

    const facets = await this.getFacets(`${priceFacetKey}: range(0 to *)`)

    for (const [key, facet] of Object.entries(facets.body?.facets ?? {})) {
      if (key !== priceFacetKey || !('ranges' in facet) || facet.ranges.length === 0) {
        continue
      }

      result.push({
        label: 'Price',
        key: priceKey,
        options: [facet.ranges[0].min, facet.ranges[0].max].map((value) => ({
          value,
          label: String(value)
        })),
        type: 'range'
      })
    }

    console.log(result)

    return result
  }

  private getTypes(): Promise<ClientResponse<ProductTypePagedQueryResponse>> {
    return this.client.root
      .productTypes()
      .get({ queryArgs: { limit: 100 } })
      .execute()
  }

  private getFacets(facetArgument: string): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    return this.client.root
      .productProjections()
      .search()
      .get({ queryArgs: { facet: facetArgument, limit: 0 } })
      .execute()
  }
}

export const productApi = new ProductApi({ client: ctpApiClient })
