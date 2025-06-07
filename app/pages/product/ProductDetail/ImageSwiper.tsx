import { type ReactElement } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { type Image } from '../types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type ImageSwiperProperties = {
  images?: Image[]
  onClick?: (index: number) => void
  initialSlide?: number
  swiperClassName?: string
  showPagination?: boolean
}

export function ImageSwiper({
  images = [],
  onClick,
  initialSlide = 0,
  swiperClassName = '',
  showPagination = true
}: ImageSwiperProperties): ReactElement {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      initialSlide={initialSlide}
      modules={[Navigation]}
      navigation
      pagination={showPagination ? { clickable: true } : undefined}
      className={swiperClassName}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-center justify-center w-full h-full rounded-lg" onClick={() => onClick?.(index)}>
            <img src={img.url} alt={`Image ${index + 1}`} className="object-contain w-full h-full rounded-lg" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
