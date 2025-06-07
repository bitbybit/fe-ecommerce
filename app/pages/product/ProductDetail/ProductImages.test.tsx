import { ProductImages } from './ProductImages'
import { renderWithProviders } from '~/utils/test'

describe('ProductImages', () => {
  it('renders without crashing when images prop is undefined', () => {
    expect(() => renderWithProviders(<ProductImages />)).not.toThrow()
  })
})
