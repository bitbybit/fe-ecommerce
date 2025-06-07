import { render, screen } from '@testing-library/react'
import { ProductList } from './ProductList'
import { CATALOG_STATUS } from './hooks/useCatalogData'
import { mockProduct } from './ProductItem.test'
import { MemoryRouter } from 'react-router'

const mockProducts = [mockProduct]

describe('ProductList', () => {
  it('when no products found', () => {
    render(<ProductList products={[]} status={CATALOG_STATUS.READY} />)
    expect(screen.getByText('We couldn’t find any products matching your search.')).toBeInTheDocument()
  })

  it('display skeletons while loading products', () => {
    render(<ProductList products={[]} status={CATALOG_STATUS.LOADING} />)

    const skeletons = document.querySelectorAll('[data-slot="skeleton"]')
    expect(skeletons.length).toBe(8)
  })

  it('when products were loaded', () => {
    render(
      <MemoryRouter>
        <ProductList products={mockProducts} status={CATALOG_STATUS.READY} />
      </MemoryRouter>
    )

    expect(screen.getByText(mockProducts[0].name['en-US'])).toBeInTheDocument()
  })
})
