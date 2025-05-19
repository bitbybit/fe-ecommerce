import { type ReactElement } from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Calendar } from '~/components/ui/calendar'
import { Button } from '~/components/ui/button'
import { FormControl } from '~/components/ui/form'
import { createFormField, type FormType } from '~/utils/form'
import { cn } from '~/utils/ui'
import { type SchemaType } from '../schema'

export const DateOfBirth = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Date of Birth',
    name: 'dateOfBirth',
    render: (field) => (
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn('pl-3 text-left font-normal w-full', !field.value && 'text-muted-foreground')}
            >
              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            captionLayout="dropdown"
            disabled={(date) => date > new Date() || date < new Date('1905-01-01')}
            fromYear={1905}
            initialFocus
            mode="single"
            onSelect={field.onChange}
            selected={field.value instanceof Date ? field.value : undefined}
            defaultMonth={field.value instanceof Date ? field.value : undefined}
            toYear={2015}
          />
        </PopoverContent>
      </Popover>
    )
  })
