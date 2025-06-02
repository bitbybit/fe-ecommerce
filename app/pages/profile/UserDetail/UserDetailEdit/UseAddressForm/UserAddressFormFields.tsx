import { type ReactElement } from 'react'
import { CardContent, CardFooter } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { Country } from './fields/Country'
import { City } from './fields/City'
import { StreetName } from './fields/StreetName'
import { PostalCode } from './fields/PostalCode'
import { CHANGE_ADDRESS_STATUS } from '../../../hooks/useChangeAddress'
import { type FormType } from '~/utils/form'
import { type SchemaType } from './schema'

export const UserAddressFormFields = ({
  form,
  onRemove,
  onSetAsBilling,
  onSetAsShipping,
  status
}: {
  form: FormType<SchemaType>
  onRemove: () => Promise<void>
  onSetAsBilling: () => Promise<void>
  onSetAsShipping: () => Promise<void>
  status: CHANGE_ADDRESS_STATUS
}): ReactElement => {
  return (
    <fieldset disabled={status === CHANGE_ADDRESS_STATUS.LOADING}>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <Country {...form} />
          <City {...form} />
          <StreetName {...form} />
          <PostalCode {...form} />
        </div>
      </CardContent>
      <CardFooter className="flex gap-3 pb-3">
        <Button type="submit">Save</Button>
        <Button type="button" variant="destructive" onClick={() => void onRemove()}>
          Remove
        </Button>
        <Button type="button" variant="outline" onClick={() => void onSetAsBilling()}>
          Set as billing
        </Button>
        <Button type="button" variant="outline" onClick={() => void onSetAsShipping()}>
          Set as shipping
        </Button>
      </CardFooter>
    </fieldset>
  )
}
