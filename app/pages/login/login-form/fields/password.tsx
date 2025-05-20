import { useState, type ReactElement } from 'react'
import { Input } from '~/components/ui/input'
import { createFormField, type FormType } from '~/utils/form'
import { type SchemaType } from '../schema'
import { Eye, EyeOff } from 'lucide-react'

export const Password = (form: FormType<SchemaType>): ReactElement => {
  const [show, setShow] = useState(false)

  return createFormField<SchemaType>({
    form,
    label: 'Password',
    name: 'password',
    render: (field) => (
      <div className="relative">
        <Input
          type={show ? 'text' : 'password'}
          placeholder="Password"
          className="pr-[30px]"
          autoComplete="current-password"
          {...field}
        />
        <div onClick={(): void => setShow(!show)} className="absolute right-2 top-2.5">
          {show ? <Eye size={18} /> : <EyeOff size={18} />}
        </div>
      </div>
    )
  })
}
