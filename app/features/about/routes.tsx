import { About } from './components'
import { type ReactElement } from 'react'
import { type MetaFunction } from 'react-router'

export function meta(): ReturnType<MetaFunction> {
  return [{ title: 'About' }]
}

export default function Routes(): ReactElement {
  return <About />
}
