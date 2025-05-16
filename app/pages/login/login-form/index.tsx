import { type ReactElement } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { signIn, AUTH_STATUS } from '~/store/auth'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { ctpApiClient } from '~/api/client'
import { defaultValues } from './default-values'
import { schema } from './schema'
import { Email } from './fields/email'
import { Password } from './fields/password'

export const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const handleLogin = (payload: z.infer<typeof schema>): void => {
    if (ctpApiClient.isAuth) {
      console.log('Already Auth')
    } else {
      void dispatch(signIn(payload))
    }
  }

  return (
    <>
      {status === AUTH_STATUS.ERROR && <div>{errorMessage}</div>}

      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(handleLogin)(event)}
          className="block mx-auto bg-[#f8f9fa] rounded-lg space-y-6 max-w-xs mt-[20px] mb-[20px] p-[25px]"
        >
          <Email {...form} />
          <Password {...form} />

          <Button type="submit" className="block mx-auto" disabled={status === AUTH_STATUS.LOADING}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
