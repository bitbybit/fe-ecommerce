import { type ReactElement } from 'react'
import { Button } from '~/components/ui/Button'
import { Slider } from '~/components/ui/Slider'
import { SidebarGroupLabel } from '~/components/ui/Sidebar'
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
      <SidebarGroupLabel>{properties.label}</SidebarGroupLabel>
      <div className="flex justify-between">
        <Button variant="outline" className="pointer-events-none cursor-default w-[80px]">
          {formatProductItemPrice(properties.value[0])}
        </Button>
        <Button variant="outline" className="pointer-events-none cursor-default w-[80px]">
          {formatProductItemPrice(properties.value[1])}
        </Button>
      </div>

      <Slider min={min} max={max} value={properties.value} onValueChange={properties.onChange} />
    </div>
  )
}
