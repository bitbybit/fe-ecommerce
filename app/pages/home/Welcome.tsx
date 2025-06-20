import { type ReactElement } from 'react'
import { NavLink } from 'react-router'
import { H2, P } from '~/components/ui/typography'
import { Button } from '~/components/ui/Button'
import { useAppSelector } from '~/store/hooks'
import { selectIsAuth } from '~/store/auth'
import { ROUTES } from '~/routes'

export function Welcome(): ReactElement {
  const isAuth = useAppSelector(selectIsAuth)
  const userName = useAppSelector((state) => state.auth.customer?.email ?? '')
  const greeting = isAuth ? `Welcome back, ${userName}!` : 'Welcome to our store!'

  return (
    <div className="flex w-full max-w-[1280px] justify-center lg:justify-between gap-6 px-8 flex-wrap lg:flex-nowrap">
      <div className="flex flex-col justify-center items-start lg:max-h-[480px]">
        <H2 className="font-about text-4xl font-light">{greeting}</H2>

        <P className="mb-6 font-about font-light">Discover products, manage your profile, and enjoy smooth shopping!</P>
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
              className="font-about h-[40px] border-amber-500 hover:bg-amber-500 hover:text-white"
            >
              <NavLink to={ROUTES.LOGIN}>Login</NavLink>
            </Button>
          )}
        </div>
      </div>
      <div className="max-w-[480px] hidden lg:block">
        <img
          src="https://raw.githubusercontent.com/merucoding/school-project-pictures/main/1.png"
          alt="home"
          className="aspect-square rounded-md"
        />
      </div>
    </div>
  )
}
