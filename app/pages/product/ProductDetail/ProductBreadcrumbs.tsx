import { type ReactElement } from 'react'
import { generatePath, NavLink } from 'react-router'
import { SlashIcon } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '~/components/ui/Breadcrumb'
import { type ProductListCategory } from '~/api/namespaces/product'
import { ROUTES } from '~/routes'

function CatalogBreadcrumbs(): ReactElement {
  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <NavLink to={ROUTES.HOME}>Home</NavLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <SlashIcon />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <NavLink to={ROUTES.CATALOG}>Catalog</NavLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  )
}

function ProductBreadcrumb({ breadcrumb }: { breadcrumb: ProductListCategory }): ReactElement {
  return (
    <>
      <BreadcrumbSeparator>
        <SlashIcon />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <NavLink to={generatePath(ROUTES.CATEGORY, { categoryId: breadcrumb.id })}>{breadcrumb.label}</NavLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  )
}

export function ProductBreadcrumbs({ breadcrumbs }: { breadcrumbs: ProductListCategory[] }): ReactElement {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <CatalogBreadcrumbs />
        {breadcrumbs.map((breadcrumb) => (
          <ProductBreadcrumb key={breadcrumb.id} breadcrumb={breadcrumb} />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
