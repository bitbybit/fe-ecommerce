import type { RangeFacetResult } from '@commercetools/platform-sdk'
import { useEffect, useState, type ReactElement } from 'react'
import { productApi } from '~/api/namespaces/product'
import { Button } from '~/components/ui/Button'
import { Slider } from '~/components/ui/Slider'

interface PriceProperties {
  onChange: (range: [number, number]) => void
}

export function Price({ onChange }: PriceProperties): ReactElement {
  const [range, setRange] = useState<[number, number]>([0, 1000])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  useEffect(() => {
    async function fetchPriceLimits(): Promise<void> {
      const response = await productApi.filterProducts({ facet: 'variants.price.centAmount: range(0 to *)', limit: 0 })
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const facetPrice = response.body.facets?.['variants.price.centAmount'] as RangeFacetResult
      const min = Number(facetPrice.ranges[0].min) / 100
      const max = Number(facetPrice.ranges[0].max) / 100
      setMinPrice(min)
      setMaxPrice(max)
      setRange([min, max])
    }
    void fetchPriceLimits()
  }, [])
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
