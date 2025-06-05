import { render } from '@testing-library/react'
import { ProductImages } from './ProductImages'
import '@testing-library/jest-dom'

describe('ProductImages component', () => {
  it('renders without crashing when images prop is undefined', () => {
    expect(() => render(<ProductImages />)).not.toThrow()
  })
})
