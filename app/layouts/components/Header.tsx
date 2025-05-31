import { type ReactElement } from 'react'
import { NavLink } from 'react-router'
import { Button } from '~/components/ui/Button'
import { Navigation } from './Navigation'
import { ROUTES } from '~/routes'

interface HeaderProperties {
  isAuth: boolean
}

export default function Header({ isAuth }: HeaderProperties): ReactElement {
  return (
    <header className="bg-sky-100/50 shadow-md">
      <nav className="container mx-auto md:flex items-center justify-between p-4">
        <Button asChild variant="link" className="text-xl font-semibold">
          <NavLink to={ROUTES.HOME}>Shop</NavLink>
        </Button>
        <Navigation isAuth={isAuth} />
      </nav>
    </header>
  )
}
