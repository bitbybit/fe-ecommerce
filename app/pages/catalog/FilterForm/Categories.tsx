import { type ReactElement, type MouseEvent, useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router'
import { ChevronsUpDown } from 'lucide-react'
import { SidebarGroup } from '~/components/ui/Sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/Collapsible'
import { Button } from '~/components/ui/Button'
import { type ProductListCategory } from '~/api/namespaces/product'
import { ROUTES } from '~/routes'

type LinkProperties = {
  category: ProductListCategory
}

type CategoriesProperties = {
  categories: ProductListCategory[]
}

function Link({ category }: LinkProperties): ReactElement {
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const handleClick = async (event: MouseEvent, categoryId: string): Promise<void> => {
    event.preventDefault()
    return navigate(generatePath(ROUTES.CATEGORY, { categoryId }))
  }

  return (
    <a
      href="#"
      onClick={(event) => void handleClick(event, category.id)}
      className={`underline hover:no-underline ${category.id === categoryId ? 'text-blue-500 no-underline! font-semibold' : ''}`}
    >
      {category.label}
    </a>
  )
}

export function Categories({ categories }: CategoriesProperties): ReactElement {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((category) => [category.id, true]))
  )

  return (
    <SidebarGroup>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.subCategories?.length ? (
              <Collapsible
                className="flex flex-col"
                open={open[category.id]}
                onOpenChange={() => setOpen((previous) => ({ ...previous, [category.id]: !previous[category.id] }))}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center cursor-pointer">
                    <span>{category.label}</span>
                    <Button type="button" variant="ghost" size="icon" className="size-8 cursor-pointer">
                      <ChevronsUpDown />
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-3">
                    <Categories categories={category.subCategories} />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link category={category} />
            )}
          </li>
        ))}
      </ul>
    </SidebarGroup>
  )
}
