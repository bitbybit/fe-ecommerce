import { type ReactElement, useState } from 'react'
import { EditableSwitch } from './EditableSwitch'
import { UserDetailEditBody } from './UserDetailEdit/UserDetailEditBody'
import { UserDetailViewBody } from './UserDetailView/UserDetailViewBody'

export const UserDetailBody = (): ReactElement => {
  const [editable, setEditable] = useState(false)

  return (
    <>
      <EditableSwitch value={editable} onChange={setEditable} />
      {editable && <UserDetailEditBody />}
      {!editable && <UserDetailViewBody />}
    </>
  )
}
