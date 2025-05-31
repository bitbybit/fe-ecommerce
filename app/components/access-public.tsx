import { type ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router'
import { selectIsAuth } from '~/store/auth'
import { useAppSelector } from '~/store/hooks'
import { ROUTES } from '~/app'

export function AccessPublic({ children }: Readonly<{ children: ReactElement }>): ReactElement {
  const isAuth = useAppSelector(selectIsAuth)
  const location = useLocation()

  if (isAuth) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />
  }

  return children
}
