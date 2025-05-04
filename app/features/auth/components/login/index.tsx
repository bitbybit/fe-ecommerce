import { type ReactElement } from 'react'
import { useAppSelector } from '~/store/hooks'

export function Login(): ReactElement {
  console.log(useAppSelector((state) => state.auth.value))

  return <>Login</>
}
