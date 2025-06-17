import { type ReactElement } from 'react'
import { Button } from '~/components/ui/Button'
import { Slider } from '~/components/ui/Slider'
import { SidebarGroupLabel } from '~/components/ui/Sidebar'
import { formatProductItemPrice } from '~/utils/formatPrice'

type FilterPriceProps = {
  label: string
  onChange: (value: number[]) => void
  range: [number, number]
  value: number[]
}

export function FilterPrice(props: FilterPriceProps): ReactElement {
  const [min, max] = props.range

  return (
    <div className="flex flex-col gap-y-[15px]">
      <SidebarGroupLabel>{props.label}</SidebarGroupLabel>
      <div className="flex justify-between">
        <Button variant="outline" className="pointer-events-none cursor-default w-[80px]">
          {formatProductItemPrice(props.value[0])}
        </Button>
        <Button variant="outline" className="pointer-events-none cursor-default w-[80px]">
          {formatProductItemPrice(props.value[1])}
        </Button>
      </div>

      <Slider min={min} max={max} value={props.value} onValueChange={props.onChange} />
    </div>
  )
}
