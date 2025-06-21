import { type ReactElement } from 'react'
import { NavLink } from 'react-router'

export function InfoAndHelp(): ReactElement {
  return (
    <>
      <div>
        <h4 className="font-semibold text-black mb-3">General</h4>
        <ul className="space-y-2">
          <li>
            <NavLink to="/about" className="hover:underline transition">
              About us
            </NavLink>
          </li>
          <li>Blog</li>
          <li>Career</li>
          <li>Cooperation</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-black mb-3">Help & Guide</h4>
        <ul className="space-y-2 text-gray-500">
          <li>Help Center</li>
          <li>How to Buy</li>
          <li>Delivery</li>
          <li>Product Policy</li>
          <li>How to Return</li>
        </ul>
      </div>
    </>
  )
}
