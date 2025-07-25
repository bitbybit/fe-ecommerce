import { type ComponentProps, type ReactElement } from 'react'
import { Root } from '@radix-ui/react-label'
import { cn } from '~/utils/ui'

export function Label({ className, ...props }: ComponentProps<typeof Root>): ReactElement {
  return (
    <Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}
