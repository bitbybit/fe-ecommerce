import { type ReactElement } from 'react'
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

export const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const handleLogin = (payload: z.infer<typeof schema>): void => {
    void dispatch(signIn(payload))
  }

  return (
    <>
      {status === AUTH_STATUS.ERROR && <div>{errorMessage}</div>}
      <Card>
        <CardHeader>
          <CardTitle>LOGIN</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={(event) => void form.handleSubmit(handleLogin)(event)}>
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
      </Card>
    </>
  )
}
