import { type ElementType, type ReactElement } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { Home, Info, ShoppingCart, User2, LogIn, UserPlus, FolderOpen, UserMinus } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '~/components/ui/navigation-menu'
import type { NavigateFunction } from 'react-router'
import type { AppDispatch } from '~/store'
import { useAppDispatch } from '~/store/hooks'
import { logOut } from '~/store/auth'

interface NavigationProperties {
  isAuth: boolean
}

interface NavItem {
  to?: string
  label: string
  icon: ElementType
  auth?: boolean
  onClick?: (navigate: NavigateFunction, dispatch: AppDispatch) => Promise<void> | void
}

const navItems: NavItem[] = [
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
    async onClick(navigate, dispatch): Promise<void> {
      await dispatch(logOut())
      await navigate('/auth/login', { replace: true })
    }
  }
]

export function Navigation({ isAuth }: NavigationProperties): ReactElement {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const filteredItems = navItems.filter((item) => item.auth === undefined || item.auth === isAuth)

  return (
    <NavigationMenu>
      <NavigationMenuList className="grid grid-cols-3 sm:flex justify-center gap-2">
        {filteredItems.map(({ to, label, icon: Icon, onClick }) => (
          <NavigationMenuItem key={label}>
            {onClick ? (
              <NavigationMenuLink
                asChild
                onClick={() => void onClick(navigate, dispatch)}
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
