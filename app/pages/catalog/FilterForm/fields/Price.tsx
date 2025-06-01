import { useState, type ReactElement } from 'react'
import { Button } from '~/components/ui/Button'
import { Slider } from '~/components/ui/Slider'
import { formatProductItemPrice } from '~/utils/formatPrice'

interface PriceProperties {
  range: [number, number]
  onChange: (range: [number, number]) => void
}

export function Price({ range, onChange }: Readonly<PriceProperties>): ReactElement {
  const [priceRange, setPriceRange] = useState<[number, number]>(range)
  const [minPrice, maxPrice] = range

  function handleSliderChange(range: [number, number]): void {
    setPriceRange(range)
    onChange(range)
  }

  return (
    <div className="flex flex-col gap-y-[15px]">
      <p>Price</p>
      <div className="flex justify-between">
        <Button variant="outline">{formatProductItemPrice(priceRange[0])}</Button>
        <Button variant="outline">{formatProductItemPrice(priceRange[1])}</Button>
      </div>
      <Slider min={minPrice} max={maxPrice} value={priceRange} onValueChange={handleSliderChange} />
      <hr />
    </div>
  )
}
