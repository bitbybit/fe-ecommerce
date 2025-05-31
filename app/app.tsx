import { lazy, Suspense, type ReactElement, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AccessProtected } from '~/components/access/AccessProtected'
import { AccessPublic } from '~/components/access/AccessPublic'
import { Loading } from '~/components/Loading'
import { Toaster } from '~/components/ui/Sonner'

import PublicLayout from '~/layouts/PublicLayout'
import ProtectedLayout from '~/layouts/ProtectedLayout'
import { useAppDispatch } from '~/store/hooks'
import { checkAuth } from '~/store/auth'
import { ROUTES } from '~/routes'

const Home = lazy(() => import('~/pages/home'))
const Catalog = lazy(() => import('~/pages/catalog'))
const Product = lazy(() => import('~/pages/product'))
const About = lazy(() => import('~/pages/about'))
const Login = lazy(() => import('~/pages/login'))
const Register = lazy(() => import('~/pages/register'))
const Logout = lazy(() => import('~/pages/Logout'))
const Profile = lazy(() => import('~/pages/profile'))
const Cart = lazy(() => import('~/pages/cart'))
const NotFound = lazy(() => import('~/pages/NotFound'))

function RoutesPublic(): ReactElement {
  return (
    <Route element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path={ROUTES.CATALOG} element={<Catalog />} />
      <Route path={ROUTES.PRODUCT} element={<Product />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.AUTH} element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route
        path={ROUTES.LOGIN}
        element={
          <AccessPublic>
            <Login />
          </AccessPublic>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <AccessPublic>
            <Register />
          </AccessPublic>
        }
      />
    </Route>
  )
}

function RoutesProtected(): ReactElement {
  return (
    <Route element={<ProtectedLayout />}>
      <Route
        path={ROUTES.PROFILE}
        element={
          <AccessProtected>
            <Profile />
          </AccessProtected>
        }
      />
      <Route
        path={ROUTES.CART}
        element={
          <AccessProtected>
            <Cart />
          </AccessProtected>
        }
      />
      <Route
        path={ROUTES.LOGOUT}
        element={
          <AccessProtected>
            <Logout />
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
