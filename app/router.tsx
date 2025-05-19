import { lazy, Suspense, type ReactElement, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { Loading } from '~/components/loading'
import { Toaster } from '~/components/ui/sonner'

import PublicLayout from '~/layouts/public'
import ProtectedLayout from '~/layouts/protected'

import { useAppDispatch } from '~/store/hooks'
import { checkAuth } from '~/store/auth'

const Home = lazy(() => import('~/pages/home'))
const Catalog = lazy(() => import('~/pages/catalog'))
const Product = lazy(() => import('~/pages/product'))
const About = lazy(() => import('~/pages/about'))
const Login = lazy(() => import('~/pages/login'))
const Register = lazy(() => import('~/pages/register'))
const Profile = lazy(() => import('~/pages/profile'))
const Cart = lazy(() => import('~/pages/cart'))
const NotFound = lazy(() => import('~/pages/not-found'))

export function Router(): ReactElement {
  const dispatch = useAppDispatch()

  useEffect(() => void dispatch(checkAuth()), [dispatch])

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="product/:productId" element={<Product />} />
              <Route path="about" element={<About />} />
              <Route path="auth">
                <Route index element={<Navigate to="login" replace />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Route>
            <Route element={<ProtectedLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster />
    </>
  )
}
