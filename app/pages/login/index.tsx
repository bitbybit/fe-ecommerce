import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import LoginButton from './login-button'

export default function Routes(): ReactElement {
  useTitle('Login')

  return <LoginButton />
}
