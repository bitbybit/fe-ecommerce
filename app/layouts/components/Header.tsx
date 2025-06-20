import { type ReactElement } from 'react'
import { NavLink } from 'react-router'
import { Button } from '~/components/ui/Button'
import { Navigation } from './Navigation'
import { ROUTES } from '~/routes'

type HeaderProps = {
  isAuth: boolean
}

export default function Header({ isAuth }: HeaderProps): ReactElement {
  return (
    <header className="bg-neutral-900/90 shadow-md">
      <nav className="container mx-auto md:flex items-center justify-between p-4 max-w-[1280px]">
        <Button asChild variant="link" className="text-xl font-semibold text-white">
          <NavLink to={ROUTES.HOME}>Shop</NavLink>
        </Button>
        <Navigation isAuth={isAuth} />
      </nav>
    </header>
  )
}
