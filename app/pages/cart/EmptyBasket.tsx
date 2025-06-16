import { ShoppingCart } from 'lucide-react'
import type { ReactElement } from 'react'
import { NavLink } from 'react-router'
import { ROUTES } from '~/routes'

export function EmptyBasket(): ReactElement {
  return (
    <div className="w-full h-full flex items-center justify-center p-[10px]">
      <div className="max-w-md flex flex-col items-center justify-center gap-4 text-center">
        <ShoppingCart size={60} className="text-black" />
        <p className="text-xl sm:text-3xl font-semibold">Your cart is empty.</p>
        <p className="text-base">
          Time to start shopping!{' '}
          <NavLink to={ROUTES.CATALOG} className="underline-offset-4 hover:underline font-semibold text-neutral-800">
            Browse our catalog
          </NavLink>{' '}
          and start adding your favorites!
        </p>
      </div>
    </div>
  )
}
