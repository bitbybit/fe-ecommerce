import { type ReactElement } from 'react'
import { Outlet } from 'react-router'
import Header from './components/header'
import { Footer } from './components/footer'

export default function ProtectedLayout(): ReactElement {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuth={true} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
