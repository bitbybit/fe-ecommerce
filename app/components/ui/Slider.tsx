import { type ComponentProps, type ReactElement, useMemo } from 'react'
import { Root, Track, Range, Thumb } from '@radix-ui/react-slider'
import { cn } from '~/utils/ui'

function Thumbs({ _values }: { _values: number[] }): ReactElement[] {
  return Array.from({ length: _values.length }, (_, index) => (
    <Thumb
      data-slot="slider-thumb"
      key={index}
      className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
    />
  ))
}

export function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...properties
}: ComponentProps<typeof Root>): ReactElement {
  const actualDefaultValue = Array.isArray(defaultValue) ? defaultValue : [min, max]

  const _values = useMemo(() => (Array.isArray(value) ? value : actualDefaultValue), [value, defaultValue, min, max])

  return (
    <Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className
      )}
      {...properties}
    >
      <Track
        data-slot="slider-track"
        className={cn(
          'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
        )}
      >
        <Range
          data-slot="slider-range"
          className={cn('bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full')}
        />
      </Track>
      <Thumbs _values={_values} />
    </Root>
  )
}
