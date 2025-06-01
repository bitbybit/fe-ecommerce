import { useState, type ReactElement } from 'react'
import { Button } from '~/components/ui/Button'
import { Slider } from '~/components/ui/Slider'
import { formatProductItemPrice } from '~/utils/formatPrice'

interface PriceProperties {
  name: string
  range: [number, number]
  onChange: (name: string, range: [number, number]) => void
}

export function Price({ name, range, onChange }: Readonly<PriceProperties>): ReactElement {
  const [priceRange, setPriceRange] = useState<[number, number]>(range)
  const [startMinPrice, startMaxPrice] = range
  const minPrice = priceRange[0]
  const maxPrice = priceRange[1]

  function handleSliderChange(range: [number, number]): void {
    setPriceRange(range)
    onChange(name, range)
  }

  return (
    <div className="flex flex-col gap-y-[15px]">
      <p>Price</p>
      <div className="flex justify-between">
        <Button variant="outline" className="pointer-events-none cursor-default">
          {formatProductItemPrice(minPrice)}
        </Button>
        <Button variant="outline" className="pointer-events-none cursor-default">
          {formatProductItemPrice(maxPrice)}
        </Button>
      </div>
      <Slider min={startMinPrice} max={startMaxPrice} value={priceRange} onValueChange={handleSliderChange} />
      <hr />
    </div>
  )
}
