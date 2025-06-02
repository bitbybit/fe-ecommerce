import { type ReactElement } from 'react'
import { formatDateOfBirth } from '~/utils/formatDate'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card'
import { UserAddressField } from './UserAddressField'
import { useAppSelector } from '~/store/hooks'

export const UserInfo = (): ReactElement => {
  const firstName = useAppSelector((state) => state.auth.customer?.firstName ?? '')
  const lastName = useAppSelector((state) => state.auth.customer?.lastName ?? '')
  const dateOfBirth = formatDateOfBirth(useAppSelector((state) => state.auth.customer?.dateOfBirth ?? ''))
  const email = useAppSelector((state) => state.auth.customer?.email ?? '')

  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>INFO</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <UserAddressField label="First Name" value={firstName} />
          <UserAddressField label="Last Name" value={lastName} />
          <UserAddressField label="Date of Birth" value={dateOfBirth} />
          <UserAddressField label="Email" value={email} />
        </div>
      </CardContent>
    </Card>
  )
}
