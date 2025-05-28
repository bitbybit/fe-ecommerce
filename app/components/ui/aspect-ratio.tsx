import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'
import type { ComponentProps, ReactElement } from 'react'

function AspectRatio({ ...properties }: ComponentProps<typeof AspectRatioPrimitive.Root>): ReactElement {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...properties} />
}

export { AspectRatio }
