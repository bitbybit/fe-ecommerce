import { CART_TABLE_STATUS } from '~/store/cart/types'
import { renderWithProviders } from '~/utils/test'
import { screen, waitFor } from '@testing-library/react'
import Cart from '.'
import { makeStore } from '~/store'

const emptyCartState = makeStore({
  cart: {
    cart: {
      lineItems: [],
      id: '123',
      version: 0,
      customLineItems: [],
      totalPrice: {
        centAmount: 16_999,
        currencyCode: 'USD',
        fractionDigits: 2,
        type: 'centPrecision'
      },
      taxMode: '',
      taxRoundingMode: '',
      taxCalculationMode: '',
      inventoryMode: '',
      cartState: '',
      shippingMode: '',
      shipping: [],
      itemShippingAddresses: [],
      discountCodes: [],
      directDiscounts: [],
      refusedGifts: [],
      origin: '',
      createdAt: '',
      lastModifiedAt: ''
    },
    status: CART_TABLE_STATUS.READY,
    errorMessage: ''
  }
})

describe('Empty cart', () => {
  it('display empty cart message when cart is empty', async () => {
    renderWithProviders(<Cart />, emptyCartState)

    await waitFor(() => {
      expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
    })
  })
})
