import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import { LoginForm } from './login-form'

export default function Login(): ReactElement {
  useTitle('Login')

  return <LoginForm />
}
