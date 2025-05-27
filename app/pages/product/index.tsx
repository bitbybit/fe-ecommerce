import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import { productApi } from '~/api/namespaces/product'
import { useState, useEffect } from 'react'
import type { LocalizedString } from '@commercetools/platform-sdk'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { P, H3, H1 } from '~/components/ui/typography'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Image = {
  dimensions: {
    w: number
    h: number
  }
  url: string
}

/* eslint-disable-next-line max-lines-per-function */
export default function Routes(): ReactElement {
  useTitle('About')
  const images: Image[] = [
    {
      dimensions: {
        w: 500,
        h: 500
      },
      url: 'https://raw.githubusercontent.com/merucoding/school-project-pictures/main/chair-1.jpg'
    },
    {
      dimensions: {
        w: 500,
        h: 500
      },
      url: 'https://steamuserimages-a.akamaihd.net/ugc/1806529912255160538/5F20B565707FF4F5E5F6E0E5E4C47A297B08161D/?imw=512&amp;imh=341&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true'
    }
  ]
  const [name, setName] = useState<LocalizedString | undefined>()
  const [description, setDescription] = useState<LocalizedString | undefined>()
  const [price, setPrice] = useState<number | undefined>()
  //const [image, setImage] = useState<Image | undefined>()

  useEffect(() => {
    async function fetchProducts(): Promise<void> {
      try {
        const response = await productApi.getProductByID()
        console.log(response)
        setName(response.body.name)
        setDescription(response.body.description ?? undefined)
        //setImage(response.body.masterVariant.images?.[0] ?? undefined)
        setPrice(response.body.masterVariant.prices?.[0].value?.centAmount ?? undefined)
      } catch (error) {
        console.error('error while getting products:', error)
      }
    }

    void fetchProducts()
  }, [])

  return (
    <div className="w-full flex flex-col items-start gap-10">
      <div>
        <Button variant="outline" onClick={() => history.back()}>
          ← Back to catalog
        </Button>
      </div>
      <Card className="w-full rounded-xl border border-muted bg-card shadow-sm">
        <CardContent className="flex flex-col md:flex-row gap-8 items-start justify-start p-6 text-left">
          <div
            className={`transition-opacity duration-700 ease-in ${
              images.length === 1 ? 'opacity-10 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="w-full overflow-hidden">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                modules={[Navigation]}
                navigation
                pagination={{ clickable: true }}
                className="w-[350px]  sm:w-[500px] h-[60vh]"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index} className="w-full">
                    <div className="flex items-center justify-center w-full h-full">
                      <img src={img.url} alt={`Image ${index + 1}`} className="object-contain max-h-full max-w-full" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-start gap-4 text-left">
            <H1 className="text-2xl font-semibold">{name ? name['en-US'] : 'Loading...'}</H1>
            <P className="text-muted-foreground">{description ? description['en-US'] : 'Loading...'}</P>
            <H3>{price ? `$${(price / 100).toFixed(2)}` : 'Loading...'}</H3>
            <Button variant="default" size="lg">
              Add to cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
