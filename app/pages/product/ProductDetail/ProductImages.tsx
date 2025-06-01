import { useState, type ReactElement } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription
} from '~/components/ui/Dialog'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ImageSwiper } from './ImageSwiper'
import type { Image } from '../types/productTypes'

export function ProductImages({ images = [] }: { images?: Image[] }): ReactElement {
  const [startIndex, setStartIndex] = useState(0)

  return (
    <Dialog>
      <DialogTitle className="sr-only">Product Image Preview</DialogTitle>
      <DialogDescription className="sr-only">Detailed view of product image</DialogDescription>
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
