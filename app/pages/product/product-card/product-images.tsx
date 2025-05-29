import { useState, type ReactElement } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '~/components/ui/dialog'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Image = { dimensions: { w: number; h: number }; url: string }

export function ImageSwiper({
  images,
  onClick,
  initialSlide = 0,
  isModal = false
}: {
  images?: Image[]
  onClick?: (index: number) => void
  initialSlide?: number
  isModal?: boolean
}): ReactElement {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      initialSlide={initialSlide}
      modules={[Navigation]}
      navigation
      pagination={isModal ? undefined : { clickable: true }}
      className={isModal ? 'w-full h-full' : 'w-[350px] sm:w-[500px] h-[60vh]'}
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

export function ProductImages({ images }: { images?: Image[] }): ReactElement {
  const [startIndex, setStartIndex] = useState(0)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <ImageSwiper images={images} onClick={setStartIndex} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] h-[90vh] flex items-center justify-center">
        <ImageSwiper images={images} initialSlide={startIndex} isModal />
        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}
