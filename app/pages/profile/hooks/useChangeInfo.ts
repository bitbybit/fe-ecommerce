import { useState } from 'react'
import { toast } from 'sonner'
import { userApi } from '~/api/namespaces/user'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { setCustomer } from '~/store/auth'

export enum CHANGE_INFO_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type UseChangeInfoResult = {
  changeInfo: (firstName: string, lastName: string, dateOfBirth: Date, email: string) => Promise<void>
  status: CHANGE_INFO_STATUS
}

/**
 * Change user info
 * @returns UseChangeInfoResult
 */
export function useChangeInfo(): UseChangeInfoResult {
  const dispatch = useAppDispatch()
  const version = useAppSelector((state) => state.auth.customer?.version ?? 0)

  const [status, setStatus] = useState<CHANGE_INFO_STATUS>(CHANGE_INFO_STATUS.READY)

  const changeInfo = async (firstName: string, lastName: string, dateOfBirth: Date, email: string): Promise<void> => {
    setStatus(CHANGE_INFO_STATUS.LOADING)

    try {
      const { body: customer } = await userApi.changeCustomerData(firstName, lastName, dateOfBirth, email, version)
      dispatch(setCustomer(customer))
      setStatus(CHANGE_INFO_STATUS.READY)
      toast('You are successfully changed your info!')
    } catch (error) {
      setStatus(CHANGE_INFO_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while changing info')
    }
  }

  return { status, changeInfo }
}
