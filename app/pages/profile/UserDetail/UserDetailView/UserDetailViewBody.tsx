import { type ReactElement } from 'react'
import { UserInfo } from './UserInfo'
import { UserAddresses } from '../UserAddresses'

export const UserDetailViewBody = (): ReactElement => {
  return (
    <div className="flex flex-col gap-4">
      <UserInfo />
      <UserAddresses isEdit={false} />
    </div>
  )
}
