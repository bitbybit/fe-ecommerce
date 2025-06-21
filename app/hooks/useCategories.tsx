import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { productApi } from '~/api/namespaces/product'
import { type ProductListCategory } from '~/api/namespaces/product'

export function useCategories(): ProductListCategory[] {
  const [categories, setCategories] = useState<ProductListCategory[]>([])

  useEffect(() => {
    productApi
      .getCategories()
      .then(setCategories)
      .catch((error) => {
        toast(error instanceof Error ? error.message : 'Failed to load categories')
      })
  }, [])

  return categories
}
