import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'
import { Card, CardHeader, CardTitle } from '~/components/ui/Card'
import { Form } from '~/components/ui/Form'
import { UserInfoFormFields } from './UserInfoFormFields'
import { useAppSelector } from '~/store/hooks'
import { useChangeInfo } from '../../../hooks/useChangeInfo'
import { schema } from './schema'

export const UserInfoFormBody = (): ReactElement => {
  const dateOfBirth = useAppSelector((state) => state.auth.customer?.dateOfBirth ?? '')
  const email = useAppSelector((state) => state.auth.customer?.email ?? '')
  const firstName = useAppSelector((state) => state.auth.customer?.firstName ?? '')
  const lastName = useAppSelector((state) => state.auth.customer?.lastName ?? '')
  const { status, changeInfo } = useChangeInfo()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      dateOfBirth: new Date(dateOfBirth),
      email,
      firstName,
      lastName
    }
  })

  const handleChangeInfo = (payload: z.infer<typeof schema>): Promise<void> => {
    return changeInfo(payload.firstName, payload.lastName, payload.dateOfBirth, payload.email)
  }

  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>INFO</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(handleChangeInfo)(event)} className="space-y-6">
          <UserInfoFormFields form={form} status={status} />
        </form>
      </Form>
    </Card>
  )
}
