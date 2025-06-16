import { type ProductProjection } from '@commercetools/platform-sdk'
import { type ProductListCategory } from '~/api/namespaces/product'

type ProductInfoResult = {
  name: ProductProjection['name']
  description: ProductProjection['description'] | ProductProjection['name']
  price: number
  discount?: number
  images: NonNullable<ProductProjection['masterVariant']['images']>
  breadcrumbs: ProductListCategory[]
}

export function getBreadcrumbs(
  categories: ProductListCategory[],
  categoryId: string,
  breadcrumbs: ProductListCategory[] = []
): ProductListCategory[] {
  for (const category of categories) {
    const newBreadcrumbs = [...breadcrumbs, category]

    if (category.id === categoryId) {
      return newBreadcrumbs
    }

    if (category.subCategories !== undefined && category.subCategories.length > 0) {
      const result = getBreadcrumbs(category.subCategories, categoryId, newBreadcrumbs)
      if (result) return result
    }
  }

  return []
}

export function useProductInfo(product: ProductProjection, categories?: ProductListCategory[]): ProductInfoResult {
  const name = product.name
  const description = product.description ?? name
  const price = product.masterVariant.prices?.[0]?.value?.centAmount ?? 0
  const discount = product.masterVariant.prices?.[0]?.discounted?.value?.centAmount
  const images = product.masterVariant.images ?? []

  const breadcrumbs =
    categories && product.categories?.[0]?.id ? getBreadcrumbs(categories, product.categories[0].id) : []

  return {
    name,
    description,
    price,
    discount,
    images,
    breadcrumbs
  }
}
