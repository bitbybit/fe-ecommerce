import { render, screen } from '@testing-library/react'
import { ImageSwiper } from './ImageSwiper'
import type { Image } from '../types'

const mockImages: Image[] = [
  {
    url: 'https://yastatic.net/naydex/yandex-search/12nUDz235/f2db1aqc4A/azbTO1I9Wd_beAKjHkVH6KAuUFvCFLt4JfhyJtT11k1Zx_D0HpAhew33M60PNLUSmw23gd9va7JBW45s2e-GPkIW5hh_ASX7-EJiox5FR-igLlxH6WQ',
    dimensions: { w: 100, h: 100 }
  },
  {
    url: 'https://yastatic.net/naydex/yandex-search/12nUDz337/f2db1aqc4A/azbTO1I9Wd_beAKjHkVH6KAuUFvCFLt4JfhyJtT11k1Zx_D0HpAhewnxPqkPNrAEhQ21hd5naLZNUZMsxPSIBkII5htiETjg9kxllAZKTem9eBBcz2SD',
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
