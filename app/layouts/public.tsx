import { type ReactElement } from 'react'
import { Outlet } from 'react-router'
import Header from './components/header'
import { Footer } from './components/footer'
import { useAppSelector } from '~/store/hooks'
import { selectIsAuth } from '~/store/auth'

export default function PublicLayout(): ReactElement {
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuth={isAuth} />

      <main className="flex flex-col justify-center items-center flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
