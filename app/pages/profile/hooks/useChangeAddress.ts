import { useState } from 'react'
import { toast } from 'sonner'
import { type Address } from '@commercetools/platform-sdk'
import { userApi } from '~/api/namespaces/user'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { setCustomer } from '~/store/auth'

export enum ADDRESS_ACTION_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type UseChangeAddressResult = {
  changeAddress: (address: Address) => Promise<void>
  status: ADDRESS_ACTION_STATUS
}

export function useChangeAddress(): UseChangeAddressResult {
  const dispatch = useAppDispatch()
  const version = useAppSelector((state) => state.auth.customer?.version ?? 0)

  const [status, setStatus] = useState<ADDRESS_ACTION_STATUS>(ADDRESS_ACTION_STATUS.READY)

  const changeAddress = async (address: Address): Promise<void> => {
    setStatus(ADDRESS_ACTION_STATUS.LOADING)

    try {
      const { body: customer } = await userApi.changeCustomerAddress(address, version)
      dispatch(setCustomer(customer))
      setStatus(ADDRESS_ACTION_STATUS.READY)
      toast('You are successfully changed your address!')
    } catch (error) {
      setStatus(ADDRESS_ACTION_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while changing address')
    }
  }

  return { status, changeAddress }
}
