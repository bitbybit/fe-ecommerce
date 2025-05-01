import { Catalog } from './components'
import { type ReactElement } from 'react'
import { type MetaFunction } from 'react-router'

export function meta(): ReturnType<MetaFunction> {
  return [{ title: 'Catalog' }]
}

export default function Routes(): ReactElement {
  return <Catalog />
}
