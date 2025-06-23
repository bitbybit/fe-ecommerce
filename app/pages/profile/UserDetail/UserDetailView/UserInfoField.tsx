import { type ReactElement } from 'react'
import { Label } from '~/components/ui/Label'

type UserInfoFieldProps = { label: string; value: string | undefined }

export const UserInfoField = ({ label, value }: UserInfoFieldProps): ReactElement => {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex items-center h-9 w-full min-w-0 py-1 text-base md:text-sm">{value}</div>
    </div>
  )
}
