import { type ReactElement } from 'react'
import { formatDateOfBirth } from '~/utils/formatDate'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card'
import { UserAddressField } from './UserAddressField'
import { useAppSelector } from '~/store/hooks'

export const UserInfo = (): ReactElement => {
  const customer = useAppSelector((state) => state.auth.customer)
  const { dateOfBirth = '', email = '', firstName = '', lastName = '' } = customer ?? {}

  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>INFO</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 items-start">
          {[
            { label: 'First Name', value: firstName },
            { label: 'Last Name', value: lastName },
            { label: 'Date of Birth', value: formatDateOfBirth(dateOfBirth) },
            { label: 'Email', value: email }
          ].map((field) => (
            <UserAddressField label={field.label} value={field.value} key={field.label} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
