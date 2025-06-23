import { type ReactElement } from 'react'
import { type z, type TypeOf, type ZodType } from 'zod'
import { type useForm, type Path, type ControllerRenderProps, type FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/Form'

export type FormType<T extends ZodType> = ReturnType<typeof useForm<z.infer<T>>>

export const createFormField = <T extends ZodType>({
  form,
  label,
  name,
  render
}: {
  form: FormType<T>
  label: string
  name: Path<TypeOf<T>>
  render: (field: ControllerRenderProps<FieldValues, string>) => ReactElement
}): ReactElement => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{render(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
