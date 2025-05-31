import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { LoginFormBody } from './LoginForm/LoginFormBody'

export default function Login(): ReactElement {
  useTitle('Login')

  return <LoginFormBody />
}
