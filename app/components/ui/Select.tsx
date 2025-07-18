import { type ComponentProps, type ReactElement } from 'react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import {
  Root,
  Group,
  Value,
  Trigger,
  Icon,
  Content,
  Portal,
  Viewport,
  Label,
  Item,
  ItemIndicator,
  ItemText,
  Separator,
  ScrollUpButton,
  ScrollDownButton
} from '@radix-ui/react-select'
import { cn } from '~/utils/ui'

export function Select({ ...props }: ComponentProps<typeof Root>): ReactElement {
  return <Root data-slot="select" {...props} />
}

export function SelectGroup({ ...props }: ComponentProps<typeof Group>): ReactElement {
  return <Group data-slot="select-group" {...props} />
}

export function SelectValue({ ...props }: ComponentProps<typeof Value>): ReactElement {
  return <Value data-slot="select-value" {...props} />
}

export function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: ComponentProps<typeof Trigger> & {
  size?: 'sm' | 'default'
}): ReactElement {
  return (
    <Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </Icon>
    </Trigger>
  )
}

export function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: ComponentProps<typeof Content>): ReactElement {
  return (
    <Portal>
      <Content
        data-slot="select-content"
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
          )}
        >
          {children}
        </Viewport>
        <SelectScrollDownButton />
      </Content>
    </Portal>
  )
}

export function SelectLabel({ className, ...props }: ComponentProps<typeof Label>): ReactElement {
  return (
    <Label data-slot="select-label" className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)} {...props} />
  )
}

export function SelectItem({ className, children, ...props }: ComponentProps<typeof Item>): ReactElement {
  return (
    <Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <ItemIndicator>
          <CheckIcon className="size-4" />
        </ItemIndicator>
      </span>
      <ItemText>{children}</ItemText>
    </Item>
  )
}

export function SelectSeparator({ className, ...props }: ComponentProps<typeof Separator>): ReactElement {
  return (
    <Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

export function SelectScrollUpButton({ className, ...props }: ComponentProps<typeof ScrollUpButton>): ReactElement {
  return (
    <ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </ScrollUpButton>
  )
}

export function SelectScrollDownButton({ className, ...props }: ComponentProps<typeof ScrollDownButton>): ReactElement {
  return (
    <ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </ScrollDownButton>
  )
}
