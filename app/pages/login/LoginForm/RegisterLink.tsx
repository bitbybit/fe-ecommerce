import type { ReactElement } from 'react'
import { NavLink } from 'react-router'
import { Button } from '~/components/ui/Button'
import { ROUTES } from '~/routes'

export const RegisterLink = (): ReactElement => {
  return (
    <div className="space-y-6 px-6 flex items-center justify-center">
      <span className="text-xs m-[0]">Don't have an account?</span>
      <Button type="button" variant="link" asChild>
        <NavLink to={ROUTES.REGISTER}>Sign up</NavLink>
      </Button>
    </div>
  )
}
