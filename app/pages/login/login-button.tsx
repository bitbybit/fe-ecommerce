import { type ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { signIn, AUTH_STATUS } from '~/store/auth'
import { Button } from '~/components/ui/button'

const LoginButton = (): ReactElement => {
  const dispatch = useAppDispatch()
  const { customer, status, errorMessage } = useAppSelector((state) => state.auth)

  const handleLogin = (): void => {
    const email = 'mika.amantaikuzu@gmail.com'
    const password = 'meruert97'

    void dispatch(signIn({ email, password }))
  }

  return (
    <>
      Status: {status}
      <br />
      Error message: {errorMessage}
      <br />
      Customer: {JSON.stringify(customer)}
      <br />
      <Button onClick={handleLogin} disabled={status === AUTH_STATUS.LOADING}>
        Login
      </Button>
    </>
  )
}

export default LoginButton
