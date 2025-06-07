import { screen } from '@testing-library/react'
import { ProductPrice } from './ProductPrice'
import { renderWithProviders } from '~/utils/test'

describe('ProductPrice', () => {
  it('renders product price with discount', () => {
    const startPrice = 100
    const discountPrice = 50

    renderWithProviders(<ProductPrice startPrice={startPrice} discountPrice={discountPrice} />)

    expect(screen.getByText('$1', { selector: 'div:not(.text-green-400)' })).toBeInTheDocument()
    expect(screen.getByText('$0.5', { selector: '.text-green-400' })).toBeInTheDocument()
  })
})
