import { type ReactElement } from 'react'
import type { ProductListCategory } from '~/api/namespaces/product'
import { CategoryLink } from '~/components/catalog/CategoryLink'

type Props = {
  categories: ProductListCategory[]
}

export function FooterCategories({ categories }: Props): ReactElement {
  return (
    <div className="ml-4">
      <h4 className="font-semibold text-black mb-3">Categories</h4>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryLink category={category} />
          </li>
        ))}
      </ul>
    </div>
  )
}
