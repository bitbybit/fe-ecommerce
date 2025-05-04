import { type ReactElement } from 'react'
import { Outlet, NavLink } from 'react-router'

export default function ProtectedLayout(): ReactElement {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/catalog">Catalog</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </>
  )
}
