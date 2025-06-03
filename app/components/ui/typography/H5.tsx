import { type HTMLAttributes, type ReactElement } from 'react'
import { cn } from '~/utils/ui'

export function H5({ className, ...properties }: HTMLAttributes<HTMLHeadingElement>): ReactElement {
  return <h5 className={cn('scroll-m-20 text-md font-semibold tracking-tight', className)} {...properties} />
}
