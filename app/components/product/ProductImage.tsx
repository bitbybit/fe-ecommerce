import type { ReactElement } from 'react'
import { AspectRatio } from '../ui/AspectRatio'

export function ProductImage({ imageUrl, alt }: { imageUrl: string | undefined; alt: string }): ReactElement {
  return (
    <AspectRatio ratio={4 / 3} className="bg-white rounded-md">
      {imageUrl && <img src={imageUrl} alt={alt} className="w-full h-full object-contain" />}
    </AspectRatio>
  )
}
