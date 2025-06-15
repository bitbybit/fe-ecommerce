import { useState, type ReactElement } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '~/components/ui/Dialog'
import { ImageSwiper } from './ImageSwiper'
import { type Image } from '../types'

export function ProductImages({ images = [] }: { images?: Image[] }): ReactElement {
  const [startIndex, setStartIndex] = useState(0)

  return (
    <Dialog>
      <DialogTitle className="sr-only">Product Image Preview</DialogTitle>
      <DialogDescription className="sr-only">Detailed view of product image</DialogDescription>
      <DialogTrigger asChild>
        <div className="cursor-pointer mx-auto md:mx-6">
          <ImageSwiper
            images={images}
            onClick={setStartIndex}
            swiperClassName="w-[90vw] max-w-[500px] aspect-[4/3] rounded-lg"
            showPagination
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] h-[90vh] flex items-center justify-center">
        <ImageSwiper images={images} initialSlide={startIndex} swiperClassName="w-full h-full" showPagination={false} />
      </DialogContent>
    </Dialog>
  )
}
