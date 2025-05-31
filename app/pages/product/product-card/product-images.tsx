import { useState, type ReactElement } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '~/components/ui/dialog'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ImageSwiper } from './image-swiper'

type Image = { dimensions: { w: number; h: number }; url: string }

export function ProductImages({ images }: { images?: Image[] }): ReactElement {
  const [startIndex, setStartIndex] = useState(0)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <ImageSwiper
            images={images}
            onClick={setStartIndex}
            swiperClassName="w-[350px] sm:w-[500px] h-[60vh]"
            showPagination
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] h-[90vh] flex items-center justify-center">
        <ImageSwiper images={images} initialSlide={startIndex} swiperClassName="w-full h-full" showPagination={false} />
        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}
