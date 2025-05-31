import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '~/utils/ui'
import { type ComponentPropsWithoutRef, type ReactElement, type HTMLAttributes } from 'react'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = ({
  className,
  ...properties
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>): ReactElement => (
  <DialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...properties}
  />
)

const DialogContent = ({
  className,
  children,
  ...properties
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>): ReactElement => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
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
    </DialogPrimitive.Content>
  </DialogPortal>
)

const DialogHeader = ({ className, ...properties }: HTMLAttributes<HTMLDivElement>): ReactElement => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...properties} />
)

const DialogFooter = ({ className, ...properties }: HTMLAttributes<HTMLDivElement>): ReactElement => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...properties} />
)

const DialogTitle = ({
  className,
  ...properties
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>): ReactElement => (
  <DialogPrimitive.Title
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...properties}
  />
)

const DialogDescription = ({
  className,
  ...properties
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Description>): ReactElement => (
  <DialogPrimitive.Description className={cn('text-sm text-muted-foreground', className)} {...properties} />
)

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose }
