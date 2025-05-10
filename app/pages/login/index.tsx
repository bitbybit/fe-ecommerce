import { type ReactElement } from 'react'
import { useAppSelector } from '~/store/hooks'
import { useTitle } from '~/hooks/use-title'
import LoginButton from '~/components/login'

export default function Routes(): ReactElement {
  useTitle('Login')

  console.log(useAppSelector((state) => state.auth.value))

  return <LoginButton />
}
