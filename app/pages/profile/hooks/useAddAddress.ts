import { useState } from 'react'
import { toast } from 'sonner'
import { type Address } from '@commercetools/platform-sdk'
import { userApi } from '~/api/namespaces/user'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { setCustomer } from '~/store/auth'

export enum ADD_ADDRESS_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type UseAddAddressResult = {
  addAddress: (address: Address) => Promise<void>
  status: ADD_ADDRESS_STATUS
}

/**
 * Add address
 * @returns UseAddAddressResult
 */
export function useAddAddress(): UseAddAddressResult {
  const dispatch = useAppDispatch()
  const version = useAppSelector((state) => state.auth.customer?.version ?? 0)

  const [status, setStatus] = useState<ADD_ADDRESS_STATUS>(ADD_ADDRESS_STATUS.READY)

  const addAddress = async (address: Address): Promise<void> => {
    setStatus(ADD_ADDRESS_STATUS.LOADING)

    try {
      const { body: customer } = await userApi.addCustomerAddress(address, version)
      dispatch(setCustomer(customer))
      setStatus(ADD_ADDRESS_STATUS.READY)
      toast('You are successfully added your address!')
    } catch (error) {
      setStatus(ADD_ADDRESS_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while adding address')
    }
  }

  return { status, addAddress }
}
