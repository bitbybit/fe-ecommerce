import { type ReactElement } from 'react'
import { CardContent, CardFooter } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { FirstName } from './fields/FirstName'
import { LastName } from './fields/LastName'
import { Country } from './fields/Country'
import { City } from './fields/City'
import { StreetName } from './fields/StreetName'
import { PostalCode } from './fields/PostalCode'
import { type FormType } from '~/utils/form'
import { type SchemaType } from './schema'
import { ADDRESS_ACTION_STATUS } from '~/pages/profile/UserDetail/status'

type UserAddressFormFieldsProperties = {
  form: FormType<SchemaType>
  isAdd?: boolean
  onRemove?: () => Promise<void> | void
  onSetAsBilling?: () => Promise<void> | void
  onSetAsShipping?: () => Promise<void> | void
  status: ADDRESS_ACTION_STATUS
  submitText?: string
}

export const UserAddressFormFields = ({
  form,
  isAdd = false,
  onRemove = (): void => {},
  onSetAsBilling = (): void => {},
  onSetAsShipping = (): void => {},
  status,
  submitText = 'Save'
}: UserAddressFormFieldsProperties): ReactElement => {
  return (
    <fieldset disabled={status === ADDRESS_ACTION_STATUS.LOADING}>
      <CardContent className="px-0">
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <FirstName {...form} />
          <LastName {...form} />
          <Country {...form} />
          <City {...form} />
          <StreetName {...form} />
          <PostalCode {...form} />
        </div>
      </CardContent>
      <CardFooter className="flex gap-3 pb-3">
        <Button type="submit">{submitText}</Button>
        {!isAdd && (
          <>
            <Button type="button" variant="destructive" onClick={() => void onRemove()}>
              Remove
            </Button>
            <Button type="button" variant="outline" onClick={() => void onSetAsBilling()}>
              Set as billing
            </Button>
            <Button type="button" variant="outline" onClick={() => void onSetAsShipping()}>
              Set as shipping
            </Button>
          </>
        )}
      </CardFooter>
    </fieldset>
  )
}
