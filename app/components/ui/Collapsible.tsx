import { type ComponentProps, type ReactElement } from 'react'
import {
  Root,
  CollapsibleTrigger as RadixCollapsibleTrigger,
  CollapsibleContent as RadixCollapsibleContent
} from '@radix-ui/react-collapsible'

export function Collapsible({ ...props }: ComponentProps<typeof Root>): ReactElement {
  return <Root data-slot="collapsible" {...props} />
}

export function CollapsibleTrigger({ ...props }: ComponentProps<typeof RadixCollapsibleTrigger>): ReactElement {
  return <RadixCollapsibleTrigger data-slot="collapsible-trigger" {...props} />
}

export function CollapsibleContent({ ...props }: ComponentProps<typeof RadixCollapsibleContent>): ReactElement {
  return <RadixCollapsibleContent data-slot="collapsible-content" {...props} />
}
