import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { Country } from './fields/country'
import { Email } from './fields/email'
import { Password } from './fields/password'
import { FirstName } from './fields/first-name'
import { LastName } from './fields/last-name'
import { DateOfBirth } from './fields/date-of-birth'
import { City } from './fields/city'
import { StreetName } from './fields/street-name'
import { PostalCode } from './fields/postal-code'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { signUp, AUTH_STATUS } from '~/store/auth'
import { schema } from './schema'
import { defaultValues } from './default-values'

export const RegisterForm = (): ReactElement => {
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const handleRegister = (payload: z.infer<typeof schema>): void => {
    void dispatch(signUp(payload))
  }

  return (
    <>
      {status === AUTH_STATUS.ERROR && <div>{errorMessage}</div>}

      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(handleRegister)(event)} className="space-y-6">
          <Email {...form} />
          <Password {...form} />
          <FirstName {...form} />
          <LastName {...form} />
          <DateOfBirth {...form} />
          <Country {...form} />
          <City {...form} />
          <StreetName {...form} />
          <PostalCode {...form} />

          <Button type="submit" disabled={status === AUTH_STATUS.LOADING}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
