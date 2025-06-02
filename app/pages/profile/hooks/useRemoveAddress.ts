import { useState } from 'react'
import { toast } from 'sonner'
import { userApi } from '~/api/namespaces/user'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { setCustomer } from '~/store/auth'
import { ADDRESS_ACTION_STATUS } from '~/pages/profile/UserDetail/status'

export type UseRemoveAddressResult = {
  removeAddress: (id: string | undefined) => Promise<void>
  status: ADDRESS_ACTION_STATUS
}

export function useRemoveAddress(): UseRemoveAddressResult {
  const dispatch = useAppDispatch()
  const version = useAppSelector((state) => state.auth.customer?.version ?? 0)

  const [status, setStatus] = useState<ADDRESS_ACTION_STATUS>(ADDRESS_ACTION_STATUS.READY)

  const removeAddress = async (addressId: string | undefined): Promise<void> => {
    if (addressId === undefined) {
      throw new Error('addressId is undefined')
    }

    setStatus(ADDRESS_ACTION_STATUS.LOADING)

    try {
      const { body: customer } = await userApi.removeCustomerAddress(addressId, version)
      dispatch(setCustomer(customer))
      setStatus(ADDRESS_ACTION_STATUS.READY)
      toast('You are successfully removed your address!')
    } catch (error) {
      setStatus(ADDRESS_ACTION_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while removing address')
    }
  }

  return { status, removeAddress }
}
