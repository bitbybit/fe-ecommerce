import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'

export default function Routes(): ReactElement {
  useTitle('Register')

  return <>Register</>
}
