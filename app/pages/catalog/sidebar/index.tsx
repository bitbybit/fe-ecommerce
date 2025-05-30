import type { ReactElement } from 'react'
import { Price } from './price'

export default function Sidebar(): ReactElement {
  return (
    <div className="w-2xs p-5 flex flex-col shrink-0 shadow-md shadow-gray-300">
      <Price />
    </div>
  )
}
