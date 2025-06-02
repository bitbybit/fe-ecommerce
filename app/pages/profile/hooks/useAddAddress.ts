import { useState } from 'react'
import { toast } from 'sonner'
import { type Address } from '@commercetools/platform-sdk'
import { userApi } from '~/api/namespaces/user'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { setCustomer } from '~/store/auth'
import { ADDRESS_ACTION_STATUS } from '~/pages/profile/UserDetail/status'

export type UseAddAddressResult = {
  addAddress: (address: Address) => Promise<void>
  status: ADDRESS_ACTION_STATUS
}

/**
 * Add address
 * @returns UseAddAddressResult
 */
export function useAddAddress(): UseAddAddressResult {
  const dispatch = useAppDispatch()
  const version = useAppSelector((state) => state.auth.customer?.version ?? 0)

  const [status, setStatus] = useState<ADDRESS_ACTION_STATUS>(ADDRESS_ACTION_STATUS.READY)

  const addAddress = async (address: Address): Promise<void> => {
    setStatus(ADDRESS_ACTION_STATUS.LOADING)

    try {
      const { body: customer } = await userApi.addCustomerAddress(address, version)
      dispatch(setCustomer(customer))
      setStatus(ADDRESS_ACTION_STATUS.READY)
      toast('You are successfully added your address!')
    } catch (error) {
      setStatus(ADDRESS_ACTION_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while adding address')
    }
  }

  return { status, addAddress }
}
