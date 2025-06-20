import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { Welcome } from './Welcome'
import { Discounts } from './Discounts'

export default function Home(): ReactElement {
  useTitle('eCommerce')

  return (
    <div className="w-full flex flex-col gap-y-8 items-center justify-center py-8 flex-grow">
      <Welcome />
      <Discounts />
    </div>
  )
}
