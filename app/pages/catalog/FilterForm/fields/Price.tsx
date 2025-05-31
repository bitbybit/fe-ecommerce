import { useState, type ReactElement } from 'react'
import { Button } from '~/components/ui/Button'
import { Slider } from '~/components/ui/Slider'

interface PriceProperties {
  onChange: (range: [number, number]) => void
}

// TODO: refactor for form builder
export function Price({ onChange }: Readonly<PriceProperties>): ReactElement {
  const [range, setRange] = useState<[number, number]>([0, 1000])
  const [minPrice] = useState(0)
  const [maxPrice] = useState(1000)

  function handleSliderChange(range: [number, number]): void {
    setRange(range)
  }

  function applyPriceFilter(): void {
    onChange(range)
  }

  return (
    <div className="flex flex-col gap-y-[15px]">
      <p>Price</p>
      <div className="flex justify-between">
        <Button variant="outline">{'$' + range[0]}</Button>
        <Button variant="outline">{'$' + range[1]}</Button>
      </div>
      <Slider min={minPrice} max={maxPrice} value={range} onValueChange={handleSliderChange} />
      <Button variant="gray" onClick={applyPriceFilter}>
        Apply
      </Button>
      <hr />
    </div>
  )
}
