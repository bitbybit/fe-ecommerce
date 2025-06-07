import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { RegisterFormBody } from './RegisterForm/RegisterFormBody'

export default function Register(): ReactElement {
  useTitle('Register')

  return <RegisterFormBody />
}
