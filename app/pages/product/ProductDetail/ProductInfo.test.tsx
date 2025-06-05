import { screen } from '@testing-library/react'
import { renderWithProviders } from '~/utils/test'
import { ProductInfo } from './ProductInfo'
import type { LocalizedString } from '@commercetools/platform-sdk'

describe('ProductInfo', () => {
  const name: LocalizedString = { 'en-US': 'Test Product' }
  const description: LocalizedString = { 'en-US': 'This is a great product.' }

  it('renders product name and description', () => {
    renderWithProviders(<ProductInfo name={name} description={description} price={100} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Product')
    expect(screen.getByText('This is a great product.')).toBeInTheDocument()
  })
})
