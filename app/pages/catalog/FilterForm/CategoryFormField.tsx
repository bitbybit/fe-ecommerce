import type { ReactElement } from 'react'
import type { CategoryFilter } from '~/api/namespaces/product'

export function CategoryFormField({ categories }: { categories: CategoryFilter[] }): ReactElement {
  return (
    <ul>
      {categories.map((category) => (
        <li className="pl-4">
          <a href={category.url}>{category.label}</a>
          {category.subCategories && category.subCategories.length > 0 && (
            <CategoryFormField categories={category.subCategories} />
          )}
        </li>
      ))}
    </ul>
  )
}
