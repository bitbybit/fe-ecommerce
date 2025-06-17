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

type UserAddressFormBodyProviderProps = {
  address: Address
  defaultBillingAddressId: string
  defaultShippingAddressId: string
  form: FormType<SchemaType>
}

type UserAddressFormBodyProps = {
  address: Address
  defaultBillingAddressId: string
  defaultShippingAddressId: string
}

const UserAddressFormBodyProvider = (props: UserAddressFormBodyProviderProps): ReactElement => {
  const isBilling = props.address.id === props.defaultBillingAddressId
  const isShipping = props.address.id === props.defaultShippingAddressId
  const { status: changeAddressStatus, changeAddress } = useChangeAddress()
  const { removeAddress } = useRemoveAddress()
  const { setBillingAddress } = useSetBillingAddress()
  const { setShippingAddress } = useSetShippingAddress()

  const handleChangeAddress = (payload: z.infer<typeof schema>): Promise<void> =>
    changeAddress({
      ...props.address,
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
        {isBilling && <Badge>Default billing</Badge>} {isShipping && <Badge>Default shipping</Badge>}
      </div>
      <Form {...props.form}>
        <form onSubmit={(event) => void props.form.handleSubmit(handleChangeAddress)(event)} className="space-y-6">
          <UserAddressFormFields
            form={props.form}
            status={changeAddressStatus}
            onRemove={() => removeAddress(props.address.id)}
            onSetAsBilling={() => setBillingAddress(props.address.id)}
            onSetAsShipping={() => setShippingAddress(props.address.id)}
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
}: UserAddressFormBodyProps): ReactElement => {
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
