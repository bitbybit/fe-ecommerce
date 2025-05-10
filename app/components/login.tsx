import { useAppDispatch } from '~/store/hooks'
import { signIn } from '~/store/auth'
import type { ReactElement } from 'react'

const LoginButton = (): ReactElement => {
  const dispatch = useAppDispatch()

  const handleLogin = (): void => {
    const email = 'mika.amantaikuzu@gmail.com'
    const password = 'meruert97'

    dispatch(signIn({ email, password }))
  }

  return <button onClick={handleLogin}>Log in</button>
}

export default LoginButton
