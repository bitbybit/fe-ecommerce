import { createContext, useId, useContext, type ReactElement, type ComponentProps } from 'react'
import { type Root } from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import {
  Controller,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues
} from 'react-hook-form'
import { cn } from '~/utils/ui'
import { Label } from '~/components/ui/Label'

export { FormProvider as Form } from 'react-hook-form'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name?: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({})

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...properties
}: ControllerProps<TFieldValues, TName>): ReactElement => {
  return (
    <FormFieldContext.Provider value={{ name: properties.name }}>
      <Controller {...properties} />
    </FormFieldContext.Provider>
  )
}

export const useFormField = (): ReturnType<ReturnType<typeof useFormContext>['getFieldState']> & {
  id?: string
  name?: string
  formItemId: string
  formDescriptionId: string
  formMessageId: string
} => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(String(fieldContext.name), formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  }
}

type FormItemContextValue = {
  id?: string
}

const FormItemContext = createContext<FormItemContextValue>({})

export function FormItem({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn('grid gap-2', className)} {...properties} />
    </FormItemContext.Provider>
  )
}

export function FormLabel({ className, ...properties }: ComponentProps<typeof Root>): ReactElement {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...properties}
    />
  )
}

export function FormControl({ ...properties }: ComponentProps<typeof Slot>): ReactElement {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`}
      aria-invalid={!!error}
      {...properties}
    />
  )
}

export function FormDescription({ className, ...properties }: ComponentProps<'p'>): ReactElement {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...properties}
    />
  )
}

export function FormMessage({ className, ...properties }: ComponentProps<'p'>): ReactElement | undefined {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? '') : properties.children

  if (!body) {
    return undefined
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...properties}
    >
      {body}
    </p>
  )
}
