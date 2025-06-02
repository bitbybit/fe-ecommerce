import { type ReactElement } from 'react'
import { CardContent, CardFooter } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { FirstName } from './fields/FirstName'
import { LastName } from './fields/LastName'
import { DateOfBirth } from './fields/DateOfBirth'
import { Email } from './fields/Email'
import { CHANGE_INFO_STATUS } from '../../../hooks/useChangeInfo'
import { type FormType } from '~/utils/form'
import { type SchemaType } from './schema'

type UserInfoFormFieldsProperties = {
  form: FormType<SchemaType>
  status: CHANGE_INFO_STATUS
}

export const UserInfoFormFields = ({ form, status }: UserInfoFormFieldsProperties): ReactElement => {
  return (
    <fieldset disabled={status === CHANGE_INFO_STATUS.LOADING}>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 items-start">
          {[FirstName, LastName, DateOfBirth, Email].map((Field) => (
            <Field {...form} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </fieldset>
  )
}
