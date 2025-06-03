import { type ReactElement } from 'react'
import { Button } from '~/components/ui/Button'
import { Slider } from '~/components/ui/Slider'
import { Label } from '~/components/ui/Label'
import { formatProductItemPrice } from '~/utils/formatPrice'

interface FilterPriceProperties {
  label: string
  onChange: (value: number[]) => void
  range: [number, number]
  value: number[]
}

export function FilterPrice(properties: FilterPriceProperties): ReactElement {
  const [min, max] = properties.range

  return (
    <div className="flex flex-col gap-y-[15px]">
      <Label>{properties.label}</Label>
      <div className="flex justify-between">
        <Button variant="outline" className="pointer-events-none cursor-default">
          {formatProductItemPrice(min)}
        </Button>
        <Button variant="outline" className="pointer-events-none cursor-default">
          {formatProductItemPrice(max)}
        </Button>
      </div>

      <Slider min={min} max={max} value={properties.value} onValueChange={properties.onChange} />
      <hr />
    </div>
  )
}
