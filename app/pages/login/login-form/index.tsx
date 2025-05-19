import { useState, type ReactElement } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { signIn, AUTH_STATUS } from '~/store/auth'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { defaultValues } from './default-values'
import { schema } from './schema'
import { Email } from './fields/email'
import { Password } from './fields/password'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { LoginErrorAlert } from './login-error-alert'
import { useNavigate } from 'react-router'
import { RegisterLink } from './register-link'

export const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { status, errorMessage } = useAppSelector((state) => state.auth)
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })
  const handleLogin = (payload: z.infer<typeof schema>): void => {
    dispatch(signIn(payload))
      .unwrap()
      .then(() => navigate('/', { replace: true }))
      .catch(() => setIsErrorMessageVisible(true))
  }
  const handleFormChange = (): void => setIsErrorMessageVisible(false)
  return (
    <Card>
      <CardHeader>
        <CardTitle>LOGIN</CardTitle>
      </CardHeader>
      {status === AUTH_STATUS.ERROR && isErrorMessageVisible && LoginErrorAlert(errorMessage)}
      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(handleLogin)(event)} onChange={handleFormChange}>
          <CardContent>
            <Email {...form} />
            <Password {...form} />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={status === AUTH_STATUS.LOADING}>
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
      <RegisterLink />
    </Card>
  )
}
