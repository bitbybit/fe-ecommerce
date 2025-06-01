import type { LocalizedString } from '@commercetools/platform-sdk'

export type Image = {
  dimensions: {
    w: number
    h: number
  }
  url: string
}

export type ProductData = {
  name?: LocalizedString
  description?: LocalizedString
  price?: number
  discount?: number
  images?: Image[]
}

export type ImageSwiperProperties = {
  images?: Image[]
  onClick?: (index: number) => void
  initialSlide?: number
  swiperClassName?: string
  showPagination?: boolean
}

export type ProductCardProperties = {
  name: LocalizedString
  description: LocalizedString
  price: number
  discount?: number
  images?: Image[]
}
