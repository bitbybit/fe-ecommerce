import { type ElementType, type ReactElement } from 'react'
import { NavLink } from 'react-router'
import { Home, Info, ShoppingCart, User2, LogIn, UserPlus, FolderOpen, UserMinus } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '~/components/ui/NavigationMenu'
import { ROUTES } from '~/routes'
import { useAppSelector } from '~/store/hooks'
import { selectCartItemCount } from '~/store/cart'

type NavigationProps = {
  isAuth: boolean
}

type NavItem = {
  to: string
  label: string
  icon: ElementType
  auth?: boolean
}

const navItems: NavItem[] = [
  { to: ROUTES.HOME, label: 'Home', icon: Home },
  { to: ROUTES.CATALOG, label: 'Catalog', icon: FolderOpen },
  { to: ROUTES.ABOUT, label: 'About', icon: Info },
  { to: ROUTES.CART, label: 'Cart', icon: ShoppingCart },
  { to: ROUTES.PROFILE, label: 'Profile', icon: User2, auth: true },
  { to: ROUTES.LOGIN, label: 'Login', icon: LogIn, auth: false },
  { to: ROUTES.REGISTER, label: 'Register', icon: UserPlus, auth: false },
  { to: ROUTES.LOGOUT, label: 'LogOut', icon: UserMinus, auth: true }
]

export function Navigation({ isAuth }: NavigationProps): ReactElement {
  const filteredItems = navItems.filter((item) => item.auth === undefined || item.auth === isAuth)
  const count = useAppSelector(selectCartItemCount)
  return (
    <NavigationMenu>
      <NavigationMenuList className="grid grid-cols-3 sm:flex justify-center gap-2">
        {filteredItems.map(({ to, label, icon: Icon }) => {
          const isCart = label === 'Cart'

          return (
            <NavigationMenuItem key={label}>
              <NavigationMenuLink
                asChild
                className="flex items-center gap-2 text-sm font-medium hover:underline px-4 py-2 relative"
              >
                <NavLink to={to} className="text-white">
                  <Icon className="size-4" />
                  {label}
                  {isCart && count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
