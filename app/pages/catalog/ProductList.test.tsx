import { screen } from '@testing-library/react'
import { ProductList } from './ProductList'
import { CATALOG_STATUS } from './hooks/useCatalogData'
import { renderWithProviders } from '~/utils/test'
import type { ProductProjection } from '@commercetools/platform-sdk'

const mockProduct: ProductProjection = {
  id: '8fec3465-6f2a-490b-bdb5-b4179cd84ff3',
  version: 2,
  productType: {
    typeId: 'product-type',
    id: 'fd5a6be5-a2c1-4eb7-bba5-b40a8ff3775c'
  },
  name: {
    'en-US': 'Home console table – color Gold'
  },
  description: {
    'en-US': 'Beautiful console table for your home.'
  },
  categories: [],
  slug: {
    'en-US': 'console-table-02'
  },
  masterVariant: {
    id: 1,
    prices: [
      {
        id: '832e15d7-b337-4633-84bf-24f7c8b3a06a',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 14_999,
          fractionDigits: 2
        },
        discounted: {
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 12_749,
            fractionDigits: 2
          },
          discount: {
            typeId: 'product-discount',
            id: '3113d688-e30c-4e60-a8fb-3bf0c98ba6a5'
          }
        }
      }
    ],
    images: [
      {
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
        dimensions: {
          w: 500,
          h: 500
        }
      }
    ]
  },
  variants: [],
  createdAt: '2025-06-01T20:40:17.371Z',
  lastModifiedAt: '2025-06-01T20:40:17.481Z'
}

const mockProducts = [mockProduct]

describe('ProductList', () => {
  it('when no products found', () => {
    renderWithProviders(<ProductList products={[]} status={CATALOG_STATUS.READY} />)
    expect(screen.getByText('We couldn’t find any products matching your search.')).toBeInTheDocument()
  })

  it('display skeletons while loading products', () => {
    renderWithProviders(<ProductList products={[]} status={CATALOG_STATUS.LOADING} />)

    const skeletons = document.querySelectorAll('[data-slot="skeleton"]')
    expect(skeletons.length).toBe(8)
  })

  it('when products were loaded', () => {
    renderWithProviders(<ProductList products={mockProducts} status={CATALOG_STATUS.READY} />)

    expect(screen.getByText(mockProducts[0].name['en-US'])).toBeInTheDocument()
  })
})
