import { type ReactElement } from 'react'
import { type MetaFunction } from 'react-router'

export const meta: MetaFunction = () => {
  return [{ title: 'Register' }]
}

export default function Routes(): ReactElement {
  return <>Register</>
}
