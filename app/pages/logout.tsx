import { type ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Loading } from '~/components/loading'
import { useAppDispatch } from '~/store/hooks'
import { logOut } from '~/store/auth'

export default function Logout(): ReactElement {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(logOut())
      .unwrap()
      .then((): Promise<void> | void => navigate('/auth/login', { replace: true }))
  }, [dispatch, navigate])

  return <Loading />
}
