import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/use-title'
import { NavLink } from 'react-router'

interface MainPageProperties {
  isAuth: boolean
  userName?: string
}

export default function Home({ isAuth, userName }: MainPageProperties): ReactElement {
  useTitle('eCommerce')

  return (
    <div className=" min-h-svh flex flex-1 flex-col items-center justify-center text-center px-4 py-10 bg-sky-100/30">
      <h2 className="text-3xl font-semibold mb-4">
        {isAuth ? `Welcome back${userName ? `, ${userName}` : ''}!` : 'Welcome to our store!'}
      </h2>

      <p className="mb-6 max-w-xl text-gray-600">Discover products, manage your profile, and enjoy smooth shopping!</p>

      <div className="flex gap-4 flex-wrap justify-center">
        <NavLink to="/catalog">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-xl transition">
            Browse Catalog
          </button>
        </NavLink>
        {!isAuth && (
          <NavLink to="/auth/login">
            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-xl transition">Login</button>
          </NavLink>
        )}
      </div>
    </div>
  )
}
