import { type ReactElement } from 'react'
import { useAppSelector } from '~/store/hooks'
import { useTitle } from '~/hooks/use-title'

export default function Routes(): ReactElement {
  useTitle('Login')

  console.log(useAppSelector((state) => state.auth.value))

  return <>Login</>
}
