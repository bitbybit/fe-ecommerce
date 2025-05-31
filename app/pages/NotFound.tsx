import { type ReactElement } from 'react'
import { Button } from '~/components/ui/Button'
import { NavLink } from 'react-router'
import { ROUTES } from '~/routes'

export default function NotFound(): ReactElement {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100 text-center p-6">
      <h1 className="text-6xl animate-bounce font-bold text-red-400 mb-2">404</h1>
      <p className="text-2xl text-gray-700 mb-6">Page not found</p>
      <p className="text-xl text-gray-500 mb-8">Oops! The page you're looking for doesn't exist.</p>

      <Button asChild>
        <NavLink to={ROUTES.HOME}>← Back to Home</NavLink>
      </Button>
    </div>
  )
}
