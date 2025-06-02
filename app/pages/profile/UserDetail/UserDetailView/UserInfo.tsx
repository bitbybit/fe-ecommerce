import { type ReactElement } from 'react'
import { formatDateOfBirth } from '~/utils/formatDate'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card'
import { Label } from '~/components/ui/Label'
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
          <div className="flex flex-col gap-2">
            <Label>First Name</Label>
            <div className="flex items-center h-9 w-full min-w-0 py-1 text-base md:text-sm">{firstName}</div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Last Name</Label>
            <div className="flex items-center h-9 w-full min-w-0 py-1 text-base md:text-sm">{lastName}</div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Date of Birth</Label>
            <div className="flex items-center h-9 w-full min-w-0 py-1 text-base md:text-sm">{dateOfBirth}</div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <div className="flex items-center h-9 w-full min-w-0 py-1 text-base md:text-sm">{email}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
