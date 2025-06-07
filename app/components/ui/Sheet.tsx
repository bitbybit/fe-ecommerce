import { type ComponentProps, type ReactElement } from 'react'
import { XIcon } from 'lucide-react'
import { Root, Trigger, Close, Portal, Overlay, Content, Title, Description } from '@radix-ui/react-dialog'
import { cn } from '~/utils/ui'

export function Sheet({ ...properties }: ComponentProps<typeof Root>): ReactElement {
  return <Root data-slot="sheet" {...properties} />
}

export function SheetTrigger({ ...properties }: ComponentProps<typeof Trigger>): ReactElement {
  return <Trigger data-slot="sheet-trigger" {...properties} />
}

export function SheetClose({ ...properties }: ComponentProps<typeof Close>): ReactElement {
  return <Close data-slot="sheet-close" {...properties} />
}

function SheetPortal({ ...properties }: ComponentProps<typeof Portal>): ReactElement {
  return <Portal data-slot="sheet-portal" {...properties} />
}

function SheetOverlay({ className, ...properties }: ComponentProps<typeof Overlay>): ReactElement {
  return (
    <Overlay
      data-slot="sheet-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...properties}
    />
  )
}

export function SheetContent({
  className,
  children,
  side = 'right',
  ...properties
}: ComponentProps<typeof Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}): ReactElement {
  return (
    <SheetPortal>
      <SheetOverlay />
      <Content
        data-slot="sheet-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
          className
        )}
        {...properties}
      >
        {children}
        <Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </SheetPortal>
  )
}

export function SheetHeader({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return <div data-slot="sheet-header" className={cn('flex flex-col gap-1.5 p-4', className)} {...properties} />
}

export function SheetFooter({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return <div data-slot="sheet-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...properties} />
}

export function SheetTitle({ className, ...properties }: ComponentProps<typeof Title>): ReactElement {
  return <Title data-slot="sheet-title" className={cn('text-foreground font-semibold', className)} {...properties} />
}

export function SheetDescription({ className, ...properties }: ComponentProps<typeof Description>): ReactElement {
  return (
    <Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...properties}
    />
  )
}
