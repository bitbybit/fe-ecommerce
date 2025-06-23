import { Root } from '@radix-ui/react-aspect-ratio'
import { type ComponentProps, type ReactElement } from 'react'

export function AspectRatio({ ...props }: ComponentProps<typeof Root>): ReactElement {
  return <Root data-slot="aspect-ratio" {...props} />
}
