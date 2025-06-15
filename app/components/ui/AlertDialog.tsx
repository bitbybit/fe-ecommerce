import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '~/utils/ui'
import { buttonVariants } from '~/components/ui/Button'
import type { ComponentProps, ReactElement } from 'react'

export function AlertDialog({ ...properties }: ComponentProps<typeof AlertDialogPrimitive.Root>): ReactElement {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...properties} />
}

export function AlertDialogTrigger({
  ...properties
}: ComponentProps<typeof AlertDialogPrimitive.Trigger>): ReactElement {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...properties} />
}

export function AlertDialogPortal({ ...properties }: ComponentProps<typeof AlertDialogPrimitive.Portal>): ReactElement {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...properties} />
}

export function AlertDialogOverlay({
  className,
  ...properties
}: ComponentProps<typeof AlertDialogPrimitive.Overlay>): ReactElement {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...properties}
    />
  )
}

export function AlertDialogContent({
  className,
  ...properties
}: ComponentProps<typeof AlertDialogPrimitive.Content>): ReactElement {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className
        )}
        {...properties}
      />
    </AlertDialogPortal>
  )
}

export function AlertDialogHeader({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...properties}
    />
  )
}

export function AlertDialogFooter({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...properties}
    />
  )
}

export function AlertDialogTitle({
  className,
  ...properties
}: ComponentProps<typeof AlertDialogPrimitive.Title>): ReactElement {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...properties}
    />
  )
}

export function AlertDialogDescription({
  className,
  ...properties
}: ComponentProps<typeof AlertDialogPrimitive.Description>): ReactElement {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...properties}
    />
  )
}

export function AlertDialogAction({
  className,
  ...properties
}: ComponentProps<typeof AlertDialogPrimitive.Action>): ReactElement {
  return <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...properties} />
}

export function AlertDialogCancel({
  className,
  ...properties
}: ComponentProps<typeof AlertDialogPrimitive.Cancel>): ReactElement {
  return (
    <AlertDialogPrimitive.Cancel className={cn(buttonVariants({ variant: 'outline' }), className)} {...properties} />
  )
}
