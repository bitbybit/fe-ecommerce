import { Children, type ChangeEvent, type ChangeEventHandler, type ComponentProps, type ReactElement } from 'react'
import { DayPicker, type DropdownProps } from 'react-day-picker'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select'
import { buttonVariants } from '~/components/ui/Button'
import { cn } from '~/utils/ui'

export type CalendarProperties = ComponentProps<typeof DayPicker>

function getClassNames(properties: CalendarProperties): CalendarProperties['classNames'] {
  return {
    months: 'flex flex-col justify-center sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
    month: 'space-y-3',
    caption_start: 'is-start',
    caption_between: 'is-between',
    caption_end: 'is-end',
    caption: 'flex justify-center pt-1 relative items-center gap-1',
    caption_label: 'flex h-7 text-sm font-medium justify-center items-center grow [.is-multiple_&]:flex',
    caption_dropdowns: 'flex justify-center grow dropdowns pl-7 pr-8',
    multiple_months: 'is-multiple',
    vhidden: 'hidden [.is-between_&]:flex [.is-end_&]:flex [.is-start.is-end_&]:hidden',
    nav: "flex items-center [&:has([name='previous-month'])]:order-first [&:has([name='next-month'])]:order-last",
    nav_button: cn(buttonVariants({ variant: 'outline' }), 'h-6 w-6 bg-transparent p-0 text-muted-foreground'),
    nav_button_previous: 'absolute left-1',
    nav_button_next: 'absolute right-1',
    table: 'w-full border-collapse space-y-1',
    head_row: 'flex justify-center',
    head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
    row: 'flex justify-center w-full mt-2',
    cell: cn(
      'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent',
      properties.mode === 'range'
        ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
        : '[&:has([aria-selected])]:rounded-md'
    ),
    day: cn(buttonVariants({ variant: 'ghost' }), 'h-8 w-8 p-0 font-normal aria-selected:opacity-100'),
    day_range_start: 'day-range-start',
    day_range_end: 'day-range-end',
    day_selected:
      'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
    day_today: 'bg-accent text-accent-foreground',
    day_outside: 'text-muted-foreground opacity-50',
    day_disabled: 'text-muted-foreground opacity-50',
    day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
    day_hidden: 'invisible',
    ...properties.classNames
  }
}

function handleCalendarChange(_value: string | number, eventHandler: ChangeEventHandler<HTMLSelectElement>): void {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const event = {
    target: {
      value: String(_value)
    }
  } as ChangeEvent<HTMLSelectElement>

  eventHandler(event)
}

function IconLeft(): ReactElement {
  return <ChevronLeftIcon className="h-4 w-4" />
}

function IconRight(): ReactElement {
  return <ChevronRightIcon className="h-4 w-4" />
}

function Dropdown({ ...properties }: Readonly<DropdownProps>): ReactElement {
  return (
    <Select
      {...properties}
      onValueChange={(value) => {
        if (properties.onChange) {
          handleCalendarChange(value, properties.onChange)
        }
      }}
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      value={properties.value as string}
    >
      <SelectTrigger
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'px-2 py-1 h-7 border-none shadow-none font-medium [.is-between_&]:hidden [.is-end_&]:hidden [.is-start.is-end_&]:flex'
        )}
      >
        <SelectValue placeholder={properties?.caption}>{properties?.caption}</SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[calc(var(--radix-popper-available-height) - 50px)] overflow-y-auto scrolling-auto min-w-[var(--radix-popper-anchor-width)]">
        {properties.children &&
          Children.map(properties.children, (child) => (
            <SelectItem
              // @ts-expect-error https://github.com/shadcn-ui/ui/discussions/1553
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-assignment
              value={(child as ReactElement<unknown>)?.props?.value}
              className="min-w-[var(--radix-popper-anchor-width)] pr-7"
            >
              {
                // @ts-expect-error https://github.com/shadcn-ui/ui/discussions/1553
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                (child as ReactElement<unknown>)?.props?.children
              }
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}

export function Calendar({
  className,
  showOutsideDays = true,
  ...properties
}: CalendarProperties & { onChange?: ChangeEventHandler<HTMLSelectElement> }): ReactElement {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={getClassNames(properties)}
      components={{
        IconLeft,
        IconRight,
        Dropdown
      }}
      {...properties}
    />
  )
}

Calendar.displayName = 'Calendar'
