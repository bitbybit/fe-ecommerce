import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'
import { Form } from '~/components/ui/Form'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card'
import { UserAddressFormFields } from './UserAddressFormFields'
import { schema } from './schema'
import { useAddAddress } from '../../../hooks/useAddAddress'

const defaultValues = {
  city: '',
  country: 'US',
  firstName: '',
  lastName: '',
  postalCode: '',
  streetName: ''
}

export const AddUserAddressFormBody = (): ReactElement => {
  const { status: addAddressStatus, addAddress } = useAddAddress()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues
  })

  const handleAddAddress = async (payload: z.infer<typeof schema>): Promise<void> => {
    await addAddress({
      city: payload.city,
      country: payload.country,
      firstName: payload.firstName,
      lastName: payload.lastName,
      postalCode: payload.postalCode,
      streetName: payload.streetName
    })
    form.reset()
  }

  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>ADD NEW ADDRESS</CardTitle>
      </CardHeader>
      <CardContent className="divide-y space-y-4">
        <div>
          <Form {...form}>
            <form onSubmit={(event) => void form.handleSubmit(handleAddAddress)(event)} className="space-y-6">
              <UserAddressFormFields form={form} status={addAddressStatus} submitText="Add" isAdd={true} />
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}
