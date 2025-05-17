import { type ReactElement } from 'react'
import { Outlet } from 'react-router'
import Header from './components/header'
import { Footer } from './components/footer'
import { useAppSelector } from '~/store/hooks'

export default function ProtectedLayout(): ReactElement {
  const customer = useAppSelector((state) => state.auth.customer)
  const isAuth = !!customer
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuth={isAuth} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
