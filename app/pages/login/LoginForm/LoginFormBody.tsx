import { useState, type ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { Form } from '~/components/ui/Form'
import { Card, CardHeader, CardTitle } from '~/components/ui/Card'
import { RegisterLink } from './RegisterLink'
import { ErrorAlert } from './ErrorAlert'
import { LoginFormFields } from './LoginFormFields'
import { signIn, AUTH_STATUS, resetAuthError } from '~/store/auth'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { defaultValues } from './defaultValues'
import { schema } from './schema'
import { ROUTES } from '~/routes'

export const LoginFormBody = (): ReactElement => {
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
      await navigate(ROUTES.HOME, { replace: true })
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
          <LoginFormFields form={form} status={status} />
        </form>
      </Form>
      <RegisterLink />
    </Card>
  )
}
