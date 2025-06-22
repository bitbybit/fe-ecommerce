import { type ReactElement } from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'
import { Footer } from './components/Footer/FooterBody'
import { useAppSelector } from '~/store/hooks'
import { selectIsAuth } from '~/store/auth'
import { useCategories } from '../hooks/useCategories'

export default function PublicLayout(): ReactElement {
  const isAuth = useAppSelector(selectIsAuth)
  const categories = useCategories()

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuth={isAuth} />

      <main className="flex flex-col justify-center items-center flex-grow">
        <Outlet />
      </main>

      <Footer categories={categories} />
    </div>
  )
}
