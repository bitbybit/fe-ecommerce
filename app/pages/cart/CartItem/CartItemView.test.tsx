import type { LineItem } from '@commercetools/platform-sdk'
import { renderWithProviders } from '~/utils/test'
import { CartItemView } from './CartItemView'
import { screen } from '@testing-library/react'
import { formatProductItemPrice } from '~/utils/formatPrice'

const mockCartItem: LineItem = {
  id: '3a334a02-1663-4aa0-b9ca-6d95e0be07b',
  productId: 'e37dbed7-9a2d-4e78-bd77-3c1c0d02e12e',
  name: {
    'en-US': 'Home coffee table – White'
  },
  productType: {
    id: '251d23e8-5488-480c-8293-60e589124072',
    typeId: 'product-type'
  },
  variant: {
    id: 1,
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
  price: {
    id: '7da4c77b-cf10-4f54-a499-196c32aed7b2',
    value: {
      centAmount: 19_999,
      currencyCode: 'USD',
      fractionDigits: 2,
      type: 'centPrecision'
    }
  },
  quantity: 1,
  totalPrice: {
    centAmount: 16_999,
    currencyCode: 'USD',
    fractionDigits: 2,
    type: 'centPrecision'
  },
  discountedPricePerQuantity: [],
  taxedPricePortions: [],
  state: [],
  perMethodTaxRate: [],
  priceMode: 'Platform',
  lineItemMode: 'Standard'
}

describe('CartItemView', () => {
  it('renders cart item: name, quantity, price, totalPrice, image', () => {
    const { name, quantity, price, totalPrice, variant } = mockCartItem
    const LOCALE = 'en-US'

    renderWithProviders(
      <CartItemView
        name={name[LOCALE]}
        imageUrl={variant.images?.[0].url}
        price={price}
        quantity={quantity}
        totalPrice={totalPrice.centAmount}
        onQuantityChange={() => {}}
        onDelete={() => {}}
        isLoading={false}
      />
    )
    const image = screen.getByRole('img')
    expect(screen.getByText(name[LOCALE])).toBeInTheDocument()
    expect(image).toHaveAttribute('src', variant.images?.[0].url)
    expect(image).toHaveAttribute('alt', name[LOCALE])
    expect(screen.getByText(quantity.toString())).toBeInTheDocument()
    expect(screen.getByText(formatProductItemPrice(+price.value.centAmount))).toBeInTheDocument()
    expect(screen.getByText(`Total: ${formatProductItemPrice(+totalPrice.centAmount)}`)).toBeInTheDocument()
  })
})
