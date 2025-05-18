import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import { NavLink } from 'react-router'
import { H2, P } from '~/components/ui/typography'
import { Button } from '~/components/ui/button'
import { useAppSelector } from '~/store/hooks'

export default function Home(): ReactElement {
  useTitle('eCommerce')

  const customer = useAppSelector((state) => state.auth.customer)
  const isAuth = !!customer
  const userName = customer?.email
  console.log(isAuth)

  return (
    <div className="text-center">
      <H2>{isAuth ? `Welcome back${userName ? `, ${userName}` : ''}!` : 'Welcome to our store!'}</H2>

      <P className="mb-6 text-gray-600">Discover products, manage your profile, and enjoy smooth shopping!</P>

      <div className="flex gap-4 flex-wrap justify-center">
        <NavLink to="/catalog">
          <Button variant="blue">Browse Catalog</Button>
        </NavLink>
        {!isAuth && (
          <NavLink to="/auth/login">
            <Button variant="gray">Login</Button>
          </NavLink>
        )}
      </div>
    </div>
  )
}
