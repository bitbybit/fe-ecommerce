import { type ReactElement } from 'react'
import { type MetaFunction } from 'react-router'
import { useAppSelector } from '~/store/hooks'

export const meta: MetaFunction = () => {
  return [{ title: 'Login' }]
}

export default function Routes(): ReactElement {
  console.log(useAppSelector((state) => state.auth.value))

  return <>Login</>
}
