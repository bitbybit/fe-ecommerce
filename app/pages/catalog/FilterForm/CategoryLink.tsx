import type { MouseEvent, ReactElement } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router'
import { ROUTES } from '~/routes'
import type { ProductListCategory } from '~/api/namespaces/product'

type CategoryLinkProps = {
  category: ProductListCategory
  onClick: () => void
}

export function CategoryLink({ category, onClick }: CategoryLinkProps): ReactElement {
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const handleClick = async (event: MouseEvent, categoryId: string): Promise<void> => {
    event.preventDefault()
    onClick()
    return navigate(generatePath(ROUTES.CATEGORY, { categoryId }))
  }

  return (
    <a
      href="#"
      onClick={(event) => void handleClick(event, category.id)}
      className={`underline hover:no-underline ${category.id === categoryId ? 'text-neural-500 no-underline! font-semibold' : ''}`}
    >
      {category.label}
    </a>
  )
}
