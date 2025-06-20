import { useEffect, useState, type ReactElement } from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'
import { Footer } from './components/Footer'
import { useAppSelector } from '~/store/hooks'
import { selectIsAuth } from '~/store/auth'
import type { ProductListCategory } from '~/api/namespaces/product'
import { productApi } from '~/api/namespaces/product'
import { toast } from 'sonner'

export default function PublicLayout(): ReactElement {
  const isAuth = useAppSelector(selectIsAuth)
  const [categories, setCategories] = useState<ProductListCategory[]>([])

  useEffect(() => {
    productApi
      .getCategories()
      .then(setCategories)
      .catch((error) => {
        toast(error instanceof Error ? error.message : 'Failed to load categories')
      })
  }, [])
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
