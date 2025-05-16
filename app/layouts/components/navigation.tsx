import { type ReactElement } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { Home, Info, ShoppingCart, User2, LogIn, UserPlus, FolderOpen, UserMinus } from 'lucide-react'
import { ctpApiClient } from '~/api/client'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '~/components/ui/navigation-menu'

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
  {
    label: 'LogOut',
    icon: UserMinus,
    auth: true,
    isLogout: true
  }
]

export function Navigation({ isAuth }: NavigationProperties): ReactElement {
  const navigate = useNavigate()
  const handleLogout = (): void => {
    ctpApiClient.logout()
    void navigate('/auth/login', { replace: true })
  }
  const filteredItems = navItems.filter((item) => item.auth === undefined || item.auth === isAuth)

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {filteredItems.map(({ to, label, icon: Icon, isLogout }) => (
          <NavigationMenuItem key={label}>
            {isLogout ? (
              <NavigationMenuLink
                asChild
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium hover:underline cursor-pointer px-4 py-2"
              >
                <span>
                  <Icon className="size-4" /> {label}
                </span>
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                asChild
                className="flex items-center gap-2 text-sm font-medium hover:underline px-4 py-2"
              >
                <NavLink to={to!}>
                  <Icon className="size-4" /> {label}
                </NavLink>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
