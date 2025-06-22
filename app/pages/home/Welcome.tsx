import { type ReactElement } from 'react'
import { NavLink } from 'react-router'
import { H2, P } from '~/components/ui/typography'
import { Button } from '~/components/ui/Button'
import { useAppSelector } from '~/store/hooks'
import { selectIsAuth } from '~/store/auth'
import { ROUTES } from '~/routes'
import { Discounts } from './Discounts'
import WelcomeImage from '~/assets/images/3.jpeg'

const HOME_PAGE_SUBTITLE =
  'Discover a wide selection of stylish products, easily manage your personal profile, and enjoy smooth shopping!'

export function Welcome(): ReactElement {
  const isAuth = useAppSelector(selectIsAuth)
  const userName = useAppSelector((state) => state.auth.customer?.email ?? '')
  const greeting = isAuth ? `Welcome back, ${userName}!` : 'Welcome to our store!'
  return (
    <div className="flex w-full max-w-[1280px] justify-center lg:justify-between gap-8 px-8 flex-wrap lg:flex-nowrap">
      <div className="flex flex-col justify-center items-center lg:items-start lg:max-h-[480px]">
        <H2 className="font-about text-4xl font-light">{greeting}</H2>
        <P className="mb-6 font-about font-light text-center lg:text-left">{HOME_PAGE_SUBTITLE}</P>
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            asChild
            className="font-about h-[40px] border-amber-500 bg-amber-500 text-white hover:bg-white"
          >
            <NavLink to={ROUTES.CATALOG}>Browse Catalog</NavLink>
          </Button>
          {!isAuth && (
            <Button
              variant="outline"
              asChild
              className="font-about h-[40px] border-amber-500 bg-amber-500 text-white hover:bg-white"
            >
              <NavLink to={ROUTES.LOGIN}>Login</NavLink>
            </Button>
          )}
        </div>
        <Discounts />
      </div>
      <div className="max-w-[480px]">
        <img src={WelcomeImage} alt="home" className="aspect-square rounded-md" />
      </div>
    </div>
  )
}
