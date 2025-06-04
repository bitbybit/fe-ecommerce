import { type ComponentProps, type ReactElement } from 'react'
import {
  Root,
  CollapsibleTrigger as RadixCollapsibleTrigger,
  CollapsibleContent as RadixCollapsibleContent
} from '@radix-ui/react-collapsible'

export function Collapsible({ ...properties }: ComponentProps<typeof Root>): ReactElement {
  return <Root data-slot="collapsible" {...properties} />
}

export function CollapsibleTrigger({ ...properties }: ComponentProps<typeof RadixCollapsibleTrigger>): ReactElement {
  return <RadixCollapsibleTrigger data-slot="collapsible-trigger" {...properties} />
}

export function CollapsibleContent({ ...properties }: ComponentProps<typeof RadixCollapsibleContent>): ReactElement {
  return <RadixCollapsibleContent data-slot="collapsible-content" {...properties} />
}
