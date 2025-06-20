import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { Welcome } from './Welcome'
import { Discounts } from './Discounts'

export default function Home(): ReactElement {
  useTitle('eCommerce')

  return (
    <div>
      <Welcome />
      <Discounts />
    </div>
  )
}
