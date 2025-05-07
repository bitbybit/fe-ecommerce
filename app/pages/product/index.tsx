import { type ReactElement } from 'react'
import { type MetaFunction } from 'react-router'

export function meta({ data }: { data?: { name?: string } }): ReturnType<MetaFunction> {
  return [{ title: data?.name ?? 'Product' }]
}

export default function Routes(): ReactElement {
  return <>Product</>
}
