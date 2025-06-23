import { type ReactElement } from 'react'
import { NavLink } from 'react-router'
import { CardHeader, CardTitle } from '~/components/ui/Card'
import { P } from '~/components/ui/typography'
import { ROUTES } from '~/routes'

export const RegisterFormHeader = (): ReactElement => {
  return (
    <CardHeader>
      <CardTitle>Registration</CardTitle>
      <P>
        Already registered?{' '}
        <NavLink to={ROUTES.LOGIN} className="underline hover:no-underline">
          Please sign in
        </NavLink>
      </P>
    </CardHeader>
  )
}
