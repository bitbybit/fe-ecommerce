import { type ReactElement } from 'react'
import { UserInfoFormBody } from './UserInfoForm/UserInfoFormBody'
import { UserAddresses } from '../UserAddresses'

export const UserDetailEditBody = (): ReactElement => {
  return (
    <div className="flex flex-col gap-4">
      <UserInfoFormBody />
      <UserAddresses isEdit={true} />
    </div>
  )
}
