import { type ReactElement } from 'react'
import { UserInfoFormBody } from './UserInfoForm/UserInfoFormBody'
import { UserAddresses } from '../UserDetailView/UserAddresses'

export const UserDetailEditBody = (): ReactElement => {
  return (
    <div className="flex flex-col gap-4">
      <UserInfoFormBody />
      <UserAddresses />
    </div>
  )
}
