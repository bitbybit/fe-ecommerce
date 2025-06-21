import type { MouseEvent, ReactElement } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router'
import { ROUTES } from '~/routes'
import type { ProductListCategory } from '~/api/namespaces/product'

type CategoryLinkProps = {
  category: ProductListCategory
  onClick: () => void
  defaultClassName?: string
  activeClassName?: string
}

export function CategoryLink({
  category,
  onClick,
  defaultClassName = 'underline hover:no-underline',
  activeClassName = 'text-neutral-500 no-underline font-semibold'
}: CategoryLinkProps): ReactElement {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const isActive = category.id === categoryId

  const handleClick = async (event: MouseEvent, categoryId: string): Promise<void> => {
    event.preventDefault()
    onClick()
    return navigate(generatePath(ROUTES.CATEGORY, { categoryId }))
  }

  return (
    <a
      href="#"
      onClick={(event) => void handleClick(event, category.id)}
      className={isActive ? activeClassName : defaultClassName}
    >
      {category.label}
    </a>
  )
}
