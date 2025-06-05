import { render, screen } from '@testing-library/react'
import ProductDetailBody from './ProductDetailBody'
import type { ProductProjection } from '@commercetools/platform-sdk'
import type { ProductListCategory } from '~/api/namespaces/product'
import { MemoryRouter } from 'react-router'
const product: ProductProjection = {
  id: '1',
  version: 1,
  name: { 'en-US': 'Test Product' },
  masterVariant: {
    id: 1,
    prices: [
      {
        id: 'de049370-8083-4c40-832d-b343a2427622',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 4999,
          fractionDigits: 2
        },
        key: 'price-usd',
        country: 'US'
      }
    ],
    images: [
      {
        url: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        dimensions: { w: 100, h: 100 }
      }
    ]
  },
  categories: [{ id: 'cat-1', typeId: 'category' }],
  createdAt: '2025-06-01T20:40:16.528Z',
  lastModifiedAt: '2025-06-01T20:40:16.528Z',
  productType: {
    typeId: 'product-type',
    id: '09ea3cbb-021b-4176-a028-d4fc0e1213dd'
  },
  slug: {
    'en-US': 'iphone-case-10'
  },
  variants: []
}

describe('ProductDetailBody', () => {
  it('renders product name and breadcrumbs', () => {
    const categories: ProductListCategory[] = [{ id: 'cat-1', label: 'Category A', subCategories: [] }]

    render(
      <MemoryRouter>
        <ProductDetailBody product={product} categories={categories} />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Product')

    expect(screen.getByText('Category A')).toBeInTheDocument()
  })
})
