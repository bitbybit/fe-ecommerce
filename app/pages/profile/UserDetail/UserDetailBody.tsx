import { type ReactElement, useState } from 'react'
import { EditableSwitch } from './EditableSwitch'
import { UserDetailFormBody } from './UserDetailForm/UserDetailFormBody'
import { UserDetailViewBody } from './UserDetailView/UserDetailViewBody'

export const UserDetailBody = (): ReactElement => {
  const [editable, setEditable] = useState(false)

  return (
    <>
      <EditableSwitch value={editable} onChange={setEditable} />
      {editable && <UserDetailFormBody />}
      {!editable && <UserDetailViewBody />}
    </>
  )
}
