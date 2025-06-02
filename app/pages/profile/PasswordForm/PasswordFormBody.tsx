import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/Card'
import { Form } from '~/components/ui/Form'
import { Button } from '~/components/ui/Button'
import { CurrentPassword } from './fields/CurrentPassword'
import { NewPassword } from './fields/NewPassword'
import { CHANGE_PASSWORD_STATUS, useChangePassword } from '../hooks/useChangePassword'
import { schema } from './schema'
import { defaultValues } from './defaultValues'

export const PasswordFormBody = (): ReactElement => {
  const { status, changePassword } = useChangePassword()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues
  })

  const handleChangePassword = (payload: z.infer<typeof schema>): Promise<void> => {
    return changePassword(payload.currentPassword, payload.newPassword)
  }

  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>CHANGE PASSWORD</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(handleChangePassword)(event)} className="space-y-6">
          <fieldset disabled={status === CHANGE_PASSWORD_STATUS.LOADING}>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 items-start">
                {[CurrentPassword, NewPassword].map((Field) => (
                  <Field {...form} />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </fieldset>
        </form>
      </Form>
    </Card>
  )
}
