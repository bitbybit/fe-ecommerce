import { type Address } from '@commercetools/platform-sdk'
import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'
import { Form } from '~/components/ui/Form'
import { Badge } from '~/components/ui/Badge'
import { type FormType } from '~/utils/form'
import { UserAddressFormFields } from './UserAddressFormFields'
import { schema, type SchemaType } from './schema'
import { useChangeAddress } from '../../../hooks/useChangeAddress'
import { useRemoveAddress } from '../../../hooks/useRemoveAddress'
import { useSetBillingAddress } from '../../../hooks/useSetBillingAddress'
import { useSetShippingAddress } from '../../../hooks/useSetShippingAddress'

type UserAddressFormBodyProviderProperties = {
  address: Address
  defaultBillingAddressId: string
  defaultShippingAddressId: string
  form: FormType<SchemaType>
}

type UserAddressFormBodyProperties = {
  address: Address
  defaultBillingAddressId: string
  defaultShippingAddressId: string
}

const UserAddressFormBodyProvider = (properties: UserAddressFormBodyProviderProperties): ReactElement => {
  const isBilling = properties.address.id === properties.defaultBillingAddressId
  const isShipping = properties.address.id === properties.defaultShippingAddressId
  const { status: changeAddressStatus, changeAddress } = useChangeAddress()
  const { removeAddress } = useRemoveAddress()
  const { setBillingAddress } = useSetBillingAddress()
  const { setShippingAddress } = useSetShippingAddress()

  const handleChangeAddress = (payload: z.infer<typeof schema>): Promise<void> =>
    changeAddress({
      ...properties.address,
      city: payload.city,
      country: payload.country,
      firstName: payload.firstName,
      lastName: payload.lastName,
      postalCode: payload.postalCode,
      streetName: payload.streetName
    })

  return (
    <div>
      <div className="flex gap-2 pb-2">
        {isBilling && <Badge>Billing</Badge>} {isShipping && <Badge>Shipping</Badge>}
      </div>
      <Form {...properties.form}>
        <form onSubmit={(event) => void properties.form.handleSubmit(handleChangeAddress)(event)} className="space-y-6">
          <UserAddressFormFields
            form={properties.form}
            status={changeAddressStatus}
            onRemove={() => removeAddress(properties.address.id)}
            onSetAsBilling={() => setBillingAddress(properties.address.id)}
            onSetAsShipping={() => setShippingAddress(properties.address.id)}
          />
        </form>
      </Form>
    </div>
  )
}

export const UserAddressFormBody = ({
  address,
  defaultBillingAddressId,
  defaultShippingAddressId
}: UserAddressFormBodyProperties): ReactElement => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      city: address.city,
      country: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      postalCode: address.postalCode,
      streetName: address.streetName
    }
  })

  return (
    <UserAddressFormBodyProvider
      form={form}
      address={address}
      defaultBillingAddressId={defaultBillingAddressId}
      defaultShippingAddressId={defaultShippingAddressId}
    />
  )
}
