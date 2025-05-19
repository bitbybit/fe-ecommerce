import { useState, type ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { type FormType } from '~/utils/form'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { RegisterLink } from './register-link'
import { ErrorAlert } from './error-alert'
import { Email } from './fields/email'
import { Password } from './fields/password'
import { signIn, AUTH_STATUS, resetAuthError } from '~/store/auth'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { defaultValues } from './default-values'
import { schema, type SchemaType } from './schema'

const Fields = ({ form, status }: { form: FormType<SchemaType>; status: AUTH_STATUS }): ReactElement => {
  return (
    <fieldset disabled={status === AUTH_STATUS.LOADING}>
      <CardContent>
        <Email {...form} />
        <Password {...form} />
      </CardContent>
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </fieldset>
  )
}

export const LoginForm = (): ReactElement => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues
  })

  const handleLogin = async (payload: z.infer<typeof schema>): Promise<void> => {
    try {
      await dispatch(signIn(payload)).unwrap()
      await navigate('/', { replace: true })
    } catch {
      setIsErrorMessageVisible(true)
    }
  }

  const handleChange = (): void => setIsErrorMessageVisible(false)

  useEffect(() => void dispatch(resetAuthError()), [dispatch])

  return (
    <Card className="md:min-w-lg">
      <CardHeader>
        <CardTitle>LOGIN</CardTitle>
      </CardHeader>
      {status === AUTH_STATUS.ERROR && isErrorMessageVisible && ErrorAlert(errorMessage)}
      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(handleLogin)(event)} onChange={handleChange}>
          <Fields form={form} status={status} />
        </form>
      </Form>
      <RegisterLink />
    </Card>
  )
}
