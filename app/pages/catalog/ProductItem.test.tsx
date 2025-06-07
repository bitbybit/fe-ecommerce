import type { ProductProjection } from '@commercetools/platform-sdk'
import { render, screen } from '@testing-library/react'
import { ProductItem } from './ProductItem'
import { MemoryRouter } from 'react-router'

export const mockProduct: ProductProjection = {
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

describe('ProductItem', () => {
  it('renders product item: name, description, image, prices', () => {
    render(
      <MemoryRouter>
        <ProductItem product={mockProduct} />
      </MemoryRouter>
    )
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', mockProduct.masterVariant.images?.[0]?.url)
    expect(image).toHaveAttribute('alt', mockProduct.name['en-US'])
    expect(screen.getByText(mockProduct.name['en-US'])).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description?.['en-US'] ?? mockProduct.name['en-US'])).toBeInTheDocument()
    expect(screen.getByText('$149.99')).toBeInTheDocument()
    expect(screen.getByText('$127.49')).toBeInTheDocument()
  })
})
