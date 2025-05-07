import { type ReactElement } from 'react'
import { type MetaFunction } from 'react-router'

export function meta(): ReturnType<MetaFunction> {
  return [{ title: 'Profile' }]
}

export default function Routes(): ReactElement {
  return <>Profile</>
}
