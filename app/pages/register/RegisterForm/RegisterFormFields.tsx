import { type ReactElement } from 'react'
import { type FormType } from '~/utils/form'
import { Button } from '~/components/ui/Button'
import { CardContent, CardFooter } from '~/components/ui/Card'
import { Address } from './Address'
import { ErrorAlert } from './ErrorAlert'
import { Email } from './fields/Email'
import { Password } from './fields/Password'
import { FirstName } from './fields/FirstName'
import { LastName } from './fields/LastName'
import { DateOfBirth } from './fields/DateOfBirth'
import { SameAddress } from './fields/SameAddress'
import { AUTH_STATUS } from '~/store/auth'
import { type SchemaType } from './schema'

export const RegisterFormFields = ({
  errorMessage,
  form,
  isAddressBillingSameAsMain,
  isAddressShippingSameAsMain,
  status
}: {
  errorMessage: string
  form: FormType<SchemaType>
  isAddressBillingSameAsMain: boolean
  isAddressShippingSameAsMain: boolean
  status: AUTH_STATUS
}): ReactElement => {
  return (
    <fieldset disabled={status === AUTH_STATUS.LOADING}>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <Email {...form} />
          <Password {...form} />
          <FirstName {...form} />
          <LastName {...form} />
          <DateOfBirth {...form} />
        </div>

        <Address form={form} path="addressMain" title="Main address" />

        <SameAddress form={form} label="Shipping address is same as main" name="addressShippingSameAsMain" />
        {!isAddressShippingSameAsMain && <Address form={form} path="addressShipping" title="Shipping address" />}

        <SameAddress form={form} label="Billing address is same as main" name="addressBillingSameAsMain" />
        {!isAddressBillingSameAsMain && <Address form={form} path="addressBilling" title="Billing address" />}

        {status === AUTH_STATUS.ERROR && ErrorAlert(errorMessage)}
      </CardContent>
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </fieldset>
  )
}
