import { type DiscountCode } from '@commercetools/platform-sdk'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { cartApi } from '~/api/namespaces/cart'

export enum DISCOUNTS_STATUS {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR'
}

type UseDiscountsDataResult = {
  discounts: DiscountCode[]
  status: DISCOUNTS_STATUS
}

export function useDiscountsData(): UseDiscountsDataResult {
  const [discounts, setDiscounts] = useState<DiscountCode[]>([])
  const [status, setStatus] = useState<DISCOUNTS_STATUS>(DISCOUNTS_STATUS.LOADING)

  useEffect(() => {
    async function fetchDiscountsData(): Promise<void> {
      setStatus(DISCOUNTS_STATUS.LOADING)
      try {
        const response = await cartApi.getDiscountCodes()
        setDiscounts(response.body.results)
        setStatus(DISCOUNTS_STATUS.READY)
      } catch (error) {
        setStatus(DISCOUNTS_STATUS.ERROR)
        toast(error instanceof Error ? error.message : 'Unknown error while getting discounts data')
      }
    }

    void fetchDiscountsData()
  }, [])

  return { discounts, status }
}
