import { type ElementType, type ReactElement } from 'react'
import { NavLink } from 'react-router'
import { Home, Info, ShoppingCart, User2, LogIn, UserPlus, FolderOpen, UserMinus } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '~/components/ui/navigation-menu'

interface NavigationProperties {
  isAuth: boolean
}

interface NavItem {
  to: string
  label: string
  icon: ElementType
  auth?: boolean
}

const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/catalog', label: 'Catalog', icon: FolderOpen },
  { to: '/about', label: 'About', icon: Info },
  { to: '/cart', label: 'Cart', icon: ShoppingCart, auth: true },
  { to: '/profile', label: 'Profile', icon: User2, auth: true },
  { to: '/auth/login', label: 'Login', icon: LogIn, auth: false },
  { to: '/auth/register', label: 'Register', icon: UserPlus, auth: false },
  { to: '/auth/logout', label: 'LogOut', icon: UserMinus, auth: true }
]

export function Navigation({ isAuth }: Readonly<NavigationProperties>): ReactElement {
  const filteredItems = navItems.filter((item) => item.auth === undefined || item.auth === isAuth)

  return (
    <NavigationMenu>
      <NavigationMenuList className="grid grid-cols-3 sm:flex justify-center gap-2">
        {filteredItems.map(({ to, label, icon: Icon }) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuLink
              asChild
              className="flex items-center gap-2 text-sm font-medium hover:underline px-4 py-2"
            >
              <NavLink to={to}>
                <Icon className="size-4" /> {label}
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
