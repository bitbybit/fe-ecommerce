import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import { NavLink } from 'react-router'
import { H2, P } from '~/components/ui/typography'
import { Button } from '~/components/ui/button'

interface MainPageProperties {
  isAuth: boolean
  userName?: string
}

export default function Home({ isAuth, userName }: MainPageProperties): ReactElement {
  useTitle('eCommerce')

  return (
    <div className=" min-h-svh flex flex-1 flex-col items-center justify-center text-center px-4 py-10 bg-sky-100/30">
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
