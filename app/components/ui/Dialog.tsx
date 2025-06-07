import { type ComponentPropsWithoutRef, type ReactElement, type HTMLAttributes } from 'react'
import { Portal, Close, Overlay, Content, Title, Description } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '~/utils/ui'

export { Root as Dialog, Trigger as DialogTrigger } from '@radix-ui/react-dialog'

const DialogPortal = Portal
export const DialogClose = Close

const DialogOverlay = ({ className, ...properties }: ComponentPropsWithoutRef<typeof Overlay>): ReactElement => (
  <Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...properties}
  />
)

export const DialogContent = ({
  className,
  children,
  ...properties
}: ComponentPropsWithoutRef<typeof Content>): ReactElement => (
  <DialogPortal>
    <DialogOverlay />
    <Content
      className={cn(
        'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
        className
      )}
      {...properties}
    >
      {children}
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </Content>
  </DialogPortal>
)

export const DialogHeader = ({ className, ...properties }: HTMLAttributes<HTMLDivElement>): ReactElement => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...properties} />
)

export const DialogFooter = ({ className, ...properties }: HTMLAttributes<HTMLDivElement>): ReactElement => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...properties} />
)

export const DialogTitle = ({ className, ...properties }: ComponentPropsWithoutRef<typeof Title>): ReactElement => (
  <Title className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...properties} />
)

export const DialogDescription = ({
  className,
  ...properties
}: ComponentPropsWithoutRef<typeof Description>): ReactElement => (
  <Description className={cn('text-sm text-muted-foreground', className)} {...properties} />
)
