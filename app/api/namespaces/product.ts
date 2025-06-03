import { ctpApiClient, type CtpApiClient } from '~/api/client'
import {
  type ClientResponse,
  type ByProjectKeyProductProjectionsSearchRequestBuilder,
  type AttributeDefinition,
  type ProductProjectionPagedSearchResponse,
  type ProductTypePagedQueryResponse,
  type ProductProjection,
  type ByProjectKeyCategoriesRequestBuilder,
  type CategoryPagedQueryResponse
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

export type ProductListSort = {
  defaultValue: 'asc' | 'desc' | 'none'
  key: string
  label: string
  options: ProductListFilterOption<'asc' | 'desc' | 'none'>[]
}

export type ProductListFilter = ProductListFilterFromAttributes | ProductListFilterFromFacets

export type CategoryFilter = {
  id: string
  label: string
  url: string
  parentId?: string
  subCategories?: CategoryFilter[]
}

export type ProductListQueryParameters = NonNullable<
  Parameters<ByProjectKeyProductProjectionsSearchRequestBuilder['get']>[0]
>['queryArgs']

export type CategoriesQueryParameters = NonNullable<
  Parameters<ByProjectKeyCategoriesRequestBuilder['get']>[0]
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

export type ProductListAppliedSort = {
  key: string
  value: 'asc' | 'desc'
}[]

export const PRODUCT_LIST_FILTER_TRUE = 'T'
export const PRODUCT_LIST_FILTER_FALSE = 'F'
export const PRODUCT_LIST_FILTER_NONE = 'none'
export const PRODUCT_LIST_SORT_ASC = 'asc'
export const PRODUCT_LIST_SORT_DESC = 'desc'

export class ProductApi {
  private readonly client: CtpApiClient

  constructor({ client }: ProductApiProperties) {
    this.client = client
  }

  private static convertAttributeToFilter({ label, type, name }: AttributeDefinition): ProductListFilter {
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

  private static convertFiltersToQuery(filters: ProductListAppliedFilters): string[] {
    const result: string[] = []

    for (const { type, key, value } of filters) {
      switch (type) {
        case 'set': {
          result.push(`variants.attributes.${key}.key:"${value}"`)
          break
        }

        case 'range': {
          result.push(`variants.${key}.centAmount:range(${value[0]} to ${value[1]})`)
          break
        }

        case 'boolean': {
          result.push(`variants.attributes.${key}:"${value}"`)
          break
        }

        default: {
          result.push(`variants.attributes.${key}:"${value}"`)
          break
        }
      }
    }

    return result
  }

  private static convertSortToQuery(sort: ProductListAppliedSort): string[] {
    const result: string[] = []

    for (const { key, value } of sort) {
      result.push(`${key.replace('_', '.')} ${value}`)
    }

    return result
  }

  public async getProductById(productProjectionId: string): Promise<ClientResponse<ProductProjection>> {
    return this.client.root.productProjections().withId({ ID: productProjectionId }).get().execute()
  }

  public async getProducts(
    parameters: ProductListQueryParameters,
    filters: ProductListAppliedFilters = [
      {
        type: 'boolean',
        value: PRODUCT_LIST_FILTER_FALSE,
        key: 'is-returnable'
      }
    ],
    sort: ProductListAppliedSort = [
      {
        key: 'price',
        value: PRODUCT_LIST_SORT_DESC
      }
    ],
    searchText: string = ''
  ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    return this.client.root
      .productProjections()
      .search()
      .get({
        queryArgs: {
          ...parameters,
          ...(filters.length > 0 && {
            filter: ProductApi.convertFiltersToQuery(filters)
          }),
          ...(sort.length > 0 && {
            sort: ProductApi.convertSortToQuery(sort)
          }),
          ...(searchText.length > 0 && {
            'text.en-US': searchText,
            fuzzy: true
          })
        }
      })
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

    const result = [...attributes.values()].map((attribute) => ProductApi.convertAttributeToFilter(attribute))

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

    return result
  }

  public async buildCategoriesTree(): Promise<CategoryFilter[]> {
    const allCategories = new Map<string, CategoryFilter>()
    const LOCALE = 'en'

    const categories = await this.getCategories()

    for (const category of categories.body.results) {
      allCategories.set(category.id, {
        id: category.id,
        label: category.name[LOCALE],
        url: `categories/${category.slug[LOCALE]}`,
        parentId: category.parent?.id,
        subCategories: []
      })
    }

    const categoriesTree: CategoryFilter[] = []

    for (const category of allCategories.values()) {
      if (category.parentId) {
        const parent = allCategories.get(category.parentId)
        parent?.subCategories?.push(category)
      } else {
        categoriesTree.push(category)
      }
    }

    return categoriesTree
  }

  public async getCategories(): Promise<ClientResponse<CategoryPagedQueryResponse>> {
    return this.client.root
      .categories()
      .get({ queryArgs: { limit: 100 } })
      .execute()
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
