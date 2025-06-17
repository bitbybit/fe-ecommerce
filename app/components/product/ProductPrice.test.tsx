import { screen } from '@testing-library/react'
import { ProductPrice } from './ProductPrice'
import { renderWithProviders } from '~/utils/test'

describe('ProductPrice', () => {
  it('renders product price with discount', () => {
    const startPrice = 100
    const discountPrice = 50

    renderWithProviders(<ProductPrice startPrice={startPrice} discountPrice={discountPrice} />)

    expect(screen.queryByTestId('start-price')).toHaveTextContent('$1')

    expect(screen.queryByTestId('discount-price')).toHaveTextContent('$0.5')
  })
})
