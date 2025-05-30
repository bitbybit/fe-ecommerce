import type { ReactElement } from 'react'
import { Price } from './price'
import { AttributeSelect } from './select'
import { PRODUCT_ATTRIBUTES } from './product-attributes'

export default function Sidebar(): ReactElement {
  return (
    <div className="w-2xs p-5 flex flex-col gap-y-[40px] shrink-0 shadow-md shadow-gray-300">
      <Price />
      {PRODUCT_ATTRIBUTES.map(({ name, label, type }) => {
        return <AttributeSelect key={name} name={name} label={label} type={type} />
      })}
    </div>
  )
}
