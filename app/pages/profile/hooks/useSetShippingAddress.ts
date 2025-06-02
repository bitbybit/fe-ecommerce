import { useState } from 'react'
import { toast } from 'sonner'
import { userApi } from '~/api/namespaces/user'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { setCustomer } from '~/store/auth'

export enum SET_SHIPPING_ADDRESS_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

export type UseSetShippingAddressResult = {
  setShippingAddress: (id: string | undefined) => Promise<void>
  status: SET_SHIPPING_ADDRESS_STATUS
}

/**
 * Set shipping address
 * @returns UseSetShippingAddressResult
 */
export function useSetShippingAddress(): UseSetShippingAddressResult {
  const dispatch = useAppDispatch()
  const version = useAppSelector((state) => state.auth.customer?.version ?? 0)

  const [status, setStatus] = useState<SET_SHIPPING_ADDRESS_STATUS>(SET_SHIPPING_ADDRESS_STATUS.READY)

  const setShippingAddress = async (addressId: string | undefined): Promise<void> => {
    if (addressId === undefined) {
      throw new Error('addressId is undefined')
    }

    setStatus(SET_SHIPPING_ADDRESS_STATUS.LOADING)

    try {
      const { body: customer } = await userApi.setCustomerShippingAddress(addressId, version)
      dispatch(setCustomer(customer))
      setStatus(SET_SHIPPING_ADDRESS_STATUS.READY)
      toast('You are successfully changed your shipping address!')
    } catch (error) {
      setStatus(SET_SHIPPING_ADDRESS_STATUS.ERROR)
      toast(error instanceof Error ? error.message : 'Unknown error while changing shipping address')
    }
  }

  return { status, setShippingAddress }
}
