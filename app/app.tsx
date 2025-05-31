import { lazy, Suspense, type ReactElement, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AccessProtected } from '~/components/access-protected'
import { AccessPublic } from '~/components/access-public'
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
const Logout = lazy(() => import('~/pages/logout'))
const Profile = lazy(() => import('~/pages/profile'))
const Cart = lazy(() => import('~/pages/cart'))
const NotFound = lazy(() => import('~/pages/not-found'))

function RoutesPublic(): ReactElement {
  return (
    <Route element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path="catalog" element={<Catalog />} />
      {/*TODO: change path to 'product/:productId'*/}
      <Route path="product" element={<Product />} />
      <Route path="about" element={<About />} />
      <Route path="auth">
        <Route index element={<Navigate to="login" replace />} />
        <Route
          path="login"
          element={
            <AccessPublic>
              <Login />
            </AccessPublic>
          }
        />
        <Route
          path="register"
          element={
            <AccessPublic>
              <Register />
            </AccessPublic>
          }
        />
        <Route
          path="logout"
          element={
            <AccessProtected>
              <Logout />
            </AccessProtected>
          }
        />
      </Route>
    </Route>
  )
}

function RoutesProtected(): ReactElement {
  return (
    <Route element={<ProtectedLayout />}>
      <Route
        path="profile"
        element={
          <AccessProtected>
            <Profile />
          </AccessProtected>
        }
      />
      <Route
        path="cart"
        element={
          <AccessProtected>
            <Cart />
          </AccessProtected>
        }
      />
    </Route>
  )
}

export function App(): ReactElement {
  const dispatch = useAppDispatch()

  useEffect(() => void dispatch(checkAuth()), [dispatch])

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            {RoutesPublic()}
            {RoutesProtected()}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster />
    </>
  )
}
