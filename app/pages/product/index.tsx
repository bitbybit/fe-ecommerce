import { type ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { useTitle } from '~/hooks/use-title'
import { productApi } from '~/api/namespaces/product'
import type { LocalizedString } from '@commercetools/platform-sdk'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { P, H3, H1 } from '~/components/ui/typography'
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '~/components/ui/dialog'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Image = { dimensions: { w: number; h: number }; url: string }

function useProductData(): {
  name: LocalizedString | undefined
  description: LocalizedString | undefined
  price: number | undefined
  discount: number | undefined
  images: Image[] | undefined
} {
  const [name, setName] = useState<LocalizedString | undefined>()
  const [description, setDescription] = useState<LocalizedString | undefined>()
  const [price, setPrice] = useState<number | undefined>()
  const [discount, setDiscount] = useState<number | undefined>()
  const [images, setImages] = useState<Image[] | undefined>()

  useEffect(() => {
    async function fetchProductsData(): Promise<void> {
      try {
        const response = await productApi.getProductByID()
        setName(response.body.name)
        setDescription(response.body.description ?? undefined)
        setImages(response.body.masterVariant.images ?? undefined)
        setPrice(response.body.masterVariant.prices?.[0].value?.centAmount ?? undefined)
        setDiscount(response.body.masterVariant.prices?.[0]?.discounted?.value?.centAmount)
        console.log(response.body.masterVariant.prices?.[0]?.discounted?.value?.centAmount)
      } catch (error) {
        console.error('error while getting products:', error)
      }
    }
    void fetchProductsData()
  }, [])

  return { name, description, price, discount, images }
}

function ImageSwiper({
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

function ProductInfo({
  name,
  description,
  price,
  discount
}: {
  name?: LocalizedString
  description?: LocalizedString
  price?: number
  discount?: number
}): ReactElement {
  const lang = 'en-US'
  const isLoading = price === undefined
  const hasDiscount = discount !== undefined && discount < price!

  return (
    <div className="flex-1 flex flex-col justify-start gap-4 text-left">
      <H1 className="text-2xl font-semibold">{name ? name[lang] : 'Loading...'}</H1>
      <P className="text-muted-foreground">{description ? description[lang] : 'Loading...'}</P>
      {isLoading ? (
        <H3>Loading...</H3>
      ) : hasDiscount ? (
        <div className="flex items-baseline gap-2">
          <P className="line-through text-muted-foreground">${(price / 100).toFixed(2)}</P>
          <P className="text-destructive font-bold text-xl">${(discount / 100).toFixed(2)}</P>
        </div>
      ) : (
        <H3>${(price / 100).toFixed(2)}</H3>
      )}
    </div>
  )
}

export default function Product(): ReactElement {
  useTitle('Product')
  const { name, description, price, discount, images } = useProductData()

  return (
    <div className="w-full flex flex-col items-start gap-10">
      <Button variant="outline" onClick={() => history.back()}>
        ← Back to catalog
      </Button>
      <Card className="w-full rounded-xl border border-muted bg-card shadow-sm overflow-hidden">
        <CardContent className="flex flex-col md:flex-row md:gap-40 items-start justify-start p-6 text-left break-words">
          <ProductImages images={images} />
          <ProductInfo name={name} description={description} price={price} discount={discount} />
        </CardContent>
      </Card>
    </div>
  )
}
