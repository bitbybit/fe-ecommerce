import { useEffect, type ReactElement } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'
import { toast } from 'sonner'
import { type FormType } from '~/utils/form'
import { Form } from '~/components/ui/Form'
import { Card } from '~/components/ui/Card'
import { RegisterFormHeader } from './RegisterFormHeader'
import { RegisterFormFields } from './RegisterFormFields'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { signUp, signIn, resetAuthError } from '~/store/auth'
import { schema, type SchemaType } from './schema'
import { defaultValues } from './defaultValues'
import { ROUTES } from '~/routes'

const createSameAddressWatcher = (form: FormType<SchemaType>) => {
  const subscription = form.watch((values, { name }) => {
    if (name?.startsWith('addressMain')) {
      const currentValues = form.getValues()

      if (values.addressBillingSameAsMain) {
        form.setValue('addressBilling', currentValues.addressMain)
      }

      if (values.addressShippingSameAsMain) {
        form.setValue('addressShipping', currentValues.addressMain)
      }
    }
  })

  return (): void => subscription.unsubscribe()
}

export const RegisterFormBody = (): ReactElement => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues
  })

  const handleRegister = async (payload: z.infer<typeof schema>): Promise<void> => {
    await dispatch(signUp(payload)).unwrap()
    await dispatch(signIn({ email: payload.email, password: payload.password })).unwrap()
    await navigate(ROUTES.HOME, { replace: true })
    toast('You are successfully registered!')
  }

  const isAddressBillingSameAsMain = form.watch('addressBillingSameAsMain')
  const isAddressShippingSameAsMain = form.watch('addressShippingSameAsMain')
  useEffect(() => createSameAddressWatcher(form), [form])
  useEffect(() => void dispatch(resetAuthError()), [dispatch])

  return (
    <Card className="w-[1280px] max-w-full border-0 my-6 px-2 shadow-none">
      <RegisterFormHeader />
      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(handleRegister)(event)} className="space-y-6">
          <RegisterFormFields
            errorMessage={errorMessage}
            form={form}
            isAddressBillingSameAsMain={isAddressBillingSameAsMain}
            isAddressShippingSameAsMain={isAddressShippingSameAsMain}
            status={status}
          />
        </form>
      </Form>
    </Card>
  )
}
