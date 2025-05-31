import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'

export default function Routes(): ReactElement {
  useTitle('Product')

  return <>Product</>
}
