import { type ReactElement } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Image = { dimensions: { w: number; h: number }; url: string }

type ImageSwiperProperties = {
  images?: Image[]
  onClick?: (index: number) => void
  initialSlide?: number
  swiperClassName?: string
  showPagination?: boolean
}

export function ImageSwiper({
  images,
  onClick,
  initialSlide = 0,
  swiperClassName,
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
      {images?.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-center justify-center w-full h-full" onClick={() => onClick?.(index)}>
            <img src={img.url} alt={`Image ${index + 1}`} className="object-contain max-h-full max-w-full" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
