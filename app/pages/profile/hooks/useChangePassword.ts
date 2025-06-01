import { useState } from 'react'
import { toast } from 'sonner'
import { userApi } from '~/api/namespaces/user'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { signIn } from '~/store/auth'
import { useNavigate } from 'react-router'
import { ROUTES } from '~/routes'

export enum CHANGE_PASSWORD_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type UseChangePasswordResult = {
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  status: CHANGE_PASSWORD_STATUS
}

/**
 * Change password and re-login
 * @returns UseCatalogDataResult
 */
export function useChangePassword(): UseChangePasswordResult {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const email = useAppSelector((state) => state.auth.customer?.email ?? '')
  const version = useAppSelector((state) => state.auth.customer?.version ?? 0)

  const [status, setStatus] = useState<CHANGE_PASSWORD_STATUS>(CHANGE_PASSWORD_STATUS.READY)

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    setStatus(CHANGE_PASSWORD_STATUS.LOADING)

    try {
      await userApi.changeCustomerPassword(currentPassword, newPassword, version)
      await dispatch(signIn({ email, password: newPassword })).unwrap()
      setStatus(CHANGE_PASSWORD_STATUS.READY)
      await navigate(ROUTES.PROFILE, { replace: true })
      toast('You are successfully changed your password!')
    } catch (error) {
      setStatus(CHANGE_PASSWORD_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while changing password')
    }
  }

  return { status, changePassword }
}
