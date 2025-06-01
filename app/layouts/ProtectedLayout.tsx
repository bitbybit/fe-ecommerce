import { type ReactElement } from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'
import { Footer } from './components/Footer'
import { useAppSelector } from '~/store/hooks'
import { selectIsAuth } from '~/store/auth'

export default function ProtectedLayout(): ReactElement {
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuth={isAuth} />

      <main className="flex flex-col justify-center items-center flex-grow p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
