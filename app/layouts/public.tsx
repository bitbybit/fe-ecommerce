import { type ReactElement } from 'react'
import { Outlet } from 'react-router'
import Header from './components/header'
import { Footer } from './components/footer'

export default function PublicLayout(): ReactElement {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuth={false} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
