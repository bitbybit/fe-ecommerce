import { type ComponentProps, type ReactElement } from 'react'
import { cn } from '~/utils/ui'

export function Card({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return (
    <div
      data-slot="card"
      className={cn(
        'mx-auto bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className
      )}
      {...properties}
    />
  )
}

export function CardHeader({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...properties}
    />
  )
}

export function CardTitle({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return <div data-slot="card-title" className={cn('leading-none font-semibold', className)} {...properties} />
}

export function CardAction({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...properties}
    />
  )
}

export function CardContent({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return <div data-slot="card-content" className={cn('space-y-6 px-6', className)} {...properties} />
}

export function CardFooter({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return (
    <div
      data-slot="card-footer"
      className={cn('mt-[25px] flex items-center justify-center px-6 [.border-t]:pt-6', className)}
      {...properties}
    />
  )
}

export function CardDescription({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return <div data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...properties} />
}
