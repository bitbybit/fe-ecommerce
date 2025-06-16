import { type ProductProjection } from '@commercetools/platform-sdk'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '~/utils/test'
import { ProductInfo } from './ProductInfo'
const mockProductProjection: ProductProjection = {
  id: 'product-id-1',
  version: 1,
  createdAt: new Date().toISOString(),
  lastModifiedAt: new Date().toISOString(),
  productType: { typeId: 'product-type', id: 'type-id' },
  name: { 'en-US': 'Test Product' },
  description: {
    'en-US': 'Test description'
  },
  slug: { 'en-US': 'mock-product' },
  masterVariant: {
    id: 1,
    prices: [
      {
        id: '1',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 1000,
          fractionDigits: 2
        },
        key: 'price-usd'
      }
    ],
    images: [
      {
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        dimensions: { w: 500, h: 500 }
      }
    ]
  },
  variants: [],
  hasStagedChanges: false,
  published: true,
  categories: []
}
describe('ProductInfo', () => {
  it('renders product name and description', () => {
    renderWithProviders(<ProductInfo product={mockProductProjection} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText((text) => text.includes('Test description'))).toBeInTheDocument()
  })
})
