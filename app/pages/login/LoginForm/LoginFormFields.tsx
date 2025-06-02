import { type ReactElement } from 'react'
import { CardContent, CardFooter } from '~/components/ui/Card'
import { Email } from '~/pages/login/LoginForm/fields/Email'
import { Password } from '~/pages/login/LoginForm/fields/Password'
import { Button } from '~/components/ui/Button'
import { type FormType } from '~/utils/form'
import { AUTH_STATUS } from '~/store/auth'
import { type SchemaType } from './schema'

export const LoginFormFields = ({
  form,
  status
}: {
  form: FormType<SchemaType>
  status: AUTH_STATUS
}): ReactElement => {
  return (
    <fieldset disabled={status === AUTH_STATUS.LOADING}>
      <CardContent>
        {[Email, Password].map((Field) => (
          <Field {...form} />
        ))}
      </CardContent>
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </fieldset>
  )
}
