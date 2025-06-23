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

      if (result.length > 0) {
        return result
      }
    }
  }

  return []
}

export function useProductInfo(
  { categories, description, masterVariant, name }: ProductProjection,
  categoryList?: ProductListCategory[]
): ProductInfoResult {
  const price = masterVariant.prices?.[0]?.value?.centAmount ?? 0
  const discount = masterVariant.prices?.[0]?.discounted?.value?.centAmount
  const images = masterVariant.images ?? []

  const breadcrumbs = categoryList && categories?.[0]?.id ? getBreadcrumbs(categoryList, categories[0].id) : []

  return {
    name,
    description: description ?? name,
    price,
    discount,
    images,
    breadcrumbs
  }
}
