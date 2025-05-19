import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import { NavLink } from 'react-router'
import { H2, P } from '~/components/ui/typography'
import { Button } from '~/components/ui/button'
import { useAppSelector } from '~/store/hooks'
import { selectIsAuth } from '~/store/auth'

export default function Home(): ReactElement {
  useTitle('eCommerce')

  const isAuth = useAppSelector(selectIsAuth)
  const userName = useAppSelector((state) => state.auth.customer?.email ?? '')
  const greeting = isAuth ? `Welcome back, ${userName}!` : 'Welcome to our store!'

  return (
    <div className="text-center">
      <H2>{greeting}</H2>

      <P className="mb-6 text-gray-600">Discover products, manage your profile, and enjoy smooth shopping!</P>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="blue" asChild>
          <NavLink to="/catalog">Browse Catalog</NavLink>
        </Button>

        {!isAuth && (
          <Button variant="gray" asChild>
            <NavLink to="/auth/login">Login</NavLink>
          </Button>
        )}
      </div>
    </div>
  )
}
