import { type ReactElement } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import { Home, Info, ShoppingCart, User2, LogIn, UserPlus, FolderOpen, UserMinus } from 'lucide-react'
import { ctpApiClient } from '~/api/client'

interface NavigationProperties {
  isAuth: boolean
}

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/catalog', label: 'Catalog', icon: FolderOpen },
  { to: '/about', label: 'About', icon: Info },
  { to: '/cart', label: 'Cart', icon: ShoppingCart, auth: true },
  { to: '/profile', label: 'Profile', icon: User2, auth: true },
  { to: '/auth/login', label: 'Login', icon: LogIn, auth: false },
  { to: '/auth/register', label: 'Register', icon: UserPlus, auth: false },
  { label: 'LogOut', icon: UserMinus, auth: true, isLogout: true }
]

export function Navigation({ isAuth }: NavigationProperties): ReactElement {
  const navigate = useNavigate()

  const handleLogout = (): void => {
    ctpApiClient.logout()
    void navigate('/auth/login', { replace: true })
  }

  return (
    <div className="flex gap-4 text-sm">
      {navItems
        .filter((item) => item.auth === undefined || item.auth === isAuth)
        .map(({ to, label, icon: Icon, isLogout }) =>
          isLogout ? (
            <Button key={label} variant="link" onClick={handleLogout}>
              <Icon className="size-4" />
              {label}
            </Button>
          ) : (
            <Button key={to} asChild variant="link">
              <NavLink to={to!}>
                <Icon className="size-4" />
                {label}
              </NavLink>
            </Button>
          )
        )}
    </div>
  )
}
