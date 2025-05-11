import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import { RegisterForm } from './register-form'

export default function Register(): ReactElement {
  useTitle('Register')

  return <RegisterForm />
}
