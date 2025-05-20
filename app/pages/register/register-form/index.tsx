import { useEffect, type ReactElement } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'
import { toast } from 'sonner'
import { type FormType } from '~/utils/form'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { P } from '~/components/ui/typography'
import { Address } from './address'
import { ErrorAlert } from './error-alert'
import { Email } from './fields/email'
import { Password } from './fields/password'
import { FirstName } from './fields/first-name'
import { LastName } from './fields/last-name'
import { DateOfBirth } from './fields/date-of-birth'
import { SameAddress } from './fields/same-address'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { signUp, AUTH_STATUS, signIn, resetAuthError } from '~/store/auth'
import { schema, type SchemaType } from './schema'
import { defaultValues } from './default-values'

const Header = (): ReactElement => {
  return (
    <CardHeader>
      <CardTitle>Registration</CardTitle>
      <P>
        Already registered?{' '}
        <NavLink to="/auth/login" className="underline hover:no-underline">
          Please sign in
        </NavLink>
      </P>
    </CardHeader>
  )
}

const Fields = ({
  errorMessage,
  form,
  isAddressBillingSameAsMain,
  isAddressShippingSameAsMain,
  status
}: {
  errorMessage: string
  form: FormType<SchemaType>
  isAddressBillingSameAsMain: boolean
  isAddressShippingSameAsMain: boolean
  status: AUTH_STATUS
}): ReactElement => {
  return (
    <fieldset disabled={status === AUTH_STATUS.LOADING}>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <Email {...form} />
          <Password {...form} />
          <FirstName {...form} />
          <LastName {...form} />
          <DateOfBirth {...form} />
        </div>

        <Address form={form} path="addressMain" title="Main address" />

        <SameAddress form={form} label="Shipping address is same as main" name="addressShippingSameAsMain" />
        {!isAddressShippingSameAsMain && <Address form={form} path="addressShipping" title="Shipping address" />}

        <SameAddress form={form} label="Billing address is same as main" name="addressBillingSameAsMain" />
        {!isAddressBillingSameAsMain && <Address form={form} path="addressBilling" title="Billing address" />}

        {status === AUTH_STATUS.ERROR && ErrorAlert(errorMessage)}
      </CardContent>
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </fieldset>
  )
}

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

export const RegisterForm = (): ReactElement => {
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
    await navigate('/', { replace: true })
    toast('You are successfully registered!')
  }

  const isAddressBillingSameAsMain = form.watch('addressBillingSameAsMain')
  const isAddressShippingSameAsMain = form.watch('addressShippingSameAsMain')
  useEffect(() => createSameAddressWatcher(form), [form])
  useEffect(() => void dispatch(resetAuthError()), [dispatch])

  return (
    <Card className="min-w-full border-0 shadow-none">
      <Header />
      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(handleRegister)(event)} className="space-y-6">
          <Fields
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
