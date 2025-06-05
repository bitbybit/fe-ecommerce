import { render, screen } from '@testing-library/react'
import { ImageSwiper } from './ImageSwiper'
import type { Image } from '../types'

const mockImages: Image[] = [
  {
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
    dimensions: { w: 100, h: 100 }
  },
  {
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    dimensions: { w: 100, h: 100 }
  }
]

describe('ImageSwiper', () => {
  it('renders all images', () => {
    render(<ImageSwiper images={mockImages} />)

    const allImages = screen.getAllByRole('img')
    expect(allImages).toHaveLength(2)
    expect(allImages[0]).toHaveAttribute('src', mockImages[0].url)
    expect(allImages[1]).toHaveAttribute('src', mockImages[1].url)
  })
})
