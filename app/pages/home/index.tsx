import { type ReactElement } from 'react'
import { type MetaFunction } from 'react-router'

export function meta(): ReturnType<MetaFunction> {
  return [{ title: 'Home' }]
}

export default function Routes(): ReactElement {
  return <>Home</>
}
