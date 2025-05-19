import { type ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router'
import { selectIsAuth } from '~/store/auth'
import { useAppSelector } from '~/store/hooks'

export function AccessPublic({ children }: Readonly<{ children: ReactElement }>): ReactElement {
  const isAuth = useAppSelector(selectIsAuth)
  const location = useLocation()

  if (isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}
