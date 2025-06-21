import { type ReactElement, useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { SidebarGroup } from '~/components/ui/Sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/Collapsible'
import { Button } from '~/components/ui/Button'
import { type ProductListCategory } from '~/api/namespaces/product'
import { CategoryLink } from '../../../components/catalog/CategoryLink'

type CategoriesProps = {
  categories: ProductListCategory[]
  onClick: () => void
}

export function Categories({ categories, onClick }: CategoriesProps): ReactElement {
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
                <div className="flex justify-between items-center cursor-pointer">
                  <CategoryLink category={category} onClick={onClick} />
                  <CollapsibleTrigger asChild>
                    <Button type="button" variant="ghost" size="icon" className="size-8 cursor-pointer">
                      <ChevronsUpDown />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="pl-3">
                    <Categories categories={category.subCategories} onClick={onClick} />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <CategoryLink category={category} onClick={onClick} />
            )}
          </li>
        ))}
      </ul>
    </SidebarGroup>
  )
}
