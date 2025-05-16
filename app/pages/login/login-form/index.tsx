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
import { cn } from '~/utils/ui'

export const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)
  const [show, setShow] = useState(false)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })
  const handleLogin = (payload: z.infer<typeof schema>): void => {
    void dispatch(signIn(payload))
    setShow(true)
  }
  const handleFormChange = (): void => void (show && setShow(false))
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>LOGIN</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={(event) => void form.handleSubmit(handleLogin)(event)} onChange={handleFormChange}>
            <CardContent>
              <Email {...form} />
              <Password {...form} />
            </CardContent>
            {status === AUTH_STATUS.ERROR && show && (
              <div className={cn('text-destructive text-sm pr-[24px] pl-[24px] mt-[15px]')}>{errorMessage}</div>
            )}
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
