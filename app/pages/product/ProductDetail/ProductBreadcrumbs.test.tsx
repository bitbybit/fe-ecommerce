import { generatePath } from 'react-router'
import { screen } from '@testing-library/react'
import { ProductBreadcrumbs } from './ProductBreadcrumbs'
import { type ProductListCategory } from '~/api/namespaces/product'
import { ROUTES } from '~/routes'
import { renderWithProviders } from '~/utils/test'

describe('ProductBreadcrumbs', () => {
  it('renders category breadcrumbs with correct labels and links', () => {
    const breadcrumbs: ProductListCategory[] = [
      { id: 'case', label: 'Case' },
      { id: 'table', label: 'Table' }
    ]

    renderWithProviders(<ProductBreadcrumbs breadcrumbs={breadcrumbs} />)

    expect(screen.getByText('Case')).toBeInTheDocument()
    expect(screen.getByText('Table')).toBeInTheDocument()

    expect(screen.getByText('Case').closest('a')).toHaveAttribute(
      'href',
      generatePath(ROUTES.CATEGORY, { categoryId: 'case' })
    )
    expect(screen.getByText('Table').closest('a')).toHaveAttribute(
      'href',
      generatePath(ROUTES.CATEGORY, { categoryId: 'table' })
    )
  })
})
