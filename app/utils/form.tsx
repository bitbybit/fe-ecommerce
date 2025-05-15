import { type z, type TypeOf, type ZodType } from 'zod'
import { Input } from '~/components/ui/input'
import { type useForm, type Path } from 'react-hook-form'
import { type ComponentProps, type ReactElement } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'

export type FormType<T extends ZodType> = ReturnType<typeof useForm<z.infer<T>>>

export const createFormField = <T extends ZodType>({
  form,
  label,
  name,
  props
}: {
  form: FormType<T>
  label: string
  name: Path<TypeOf<T>>
  props?: ComponentProps<typeof Input>
}): ReactElement => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
