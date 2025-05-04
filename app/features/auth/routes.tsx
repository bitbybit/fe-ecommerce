import { Login } from './components/login'
import { Register } from './components/register'
import { type ReactElement } from 'react'
import { useIsLogin } from './hooks'
import { type MetaFunction } from 'react-router'

export const meta: MetaFunction = ({ location }) => {
  const isLogin = location.pathname.endsWith('/login')

  return [{ title: isLogin ? 'Login' : 'Register' }]
}

export default function Routes(): ReactElement {
  const isLogin = useIsLogin()

  return isLogin ? <Login /> : <Register />
}
