import { type ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Loading } from '~/components/Loading'
import { useAppDispatch } from '~/store/hooks'
import { logOut } from '~/store/auth'
import { ROUTES } from '~/routes'

export default function Logout(): ReactElement {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(logOut())
      .unwrap()
      .then((): Promise<void> | void => navigate(ROUTES.LOGIN, { replace: true }))
  }, [dispatch, navigate])

  return <Loading />
}
