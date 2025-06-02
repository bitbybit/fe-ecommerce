import { useState } from 'react'
import { toast } from 'sonner'
import { userApi } from '~/api/namespaces/user'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { setCustomer } from '~/store/auth'

export enum REMOVE_ADDRESS_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type UseRemoveAddressResult = {
  removeAddress: (id: string | undefined) => Promise<void>
  status: REMOVE_ADDRESS_STATUS
}

/**
 * Remove address
 * @returns UseRemoveAddressResult
 */
export function useRemoveAddress(): UseRemoveAddressResult {
  const dispatch = useAppDispatch()
  const version = useAppSelector((state) => state.auth.customer?.version ?? 0)

  const [status, setStatus] = useState<REMOVE_ADDRESS_STATUS>(REMOVE_ADDRESS_STATUS.READY)

  const removeAddress = async (addressId: string | undefined): Promise<void> => {
    if (addressId === undefined) {
      throw new Error('addressId is undefined')
    }

    setStatus(REMOVE_ADDRESS_STATUS.LOADING)

    try {
      const { body: customer } = await userApi.removeCustomerAddress(addressId, version)
      dispatch(setCustomer(customer))
      setStatus(REMOVE_ADDRESS_STATUS.READY)
      toast('You are successfully removed your address!')
    } catch (error) {
      setStatus(REMOVE_ADDRESS_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while removing address')
    }
  }

  return { status, removeAddress }
}
