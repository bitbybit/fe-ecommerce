import { Welcome } from '~/components/welcome'
import { type ReactElement } from 'react'

export function meta(): Record<string, string>[] {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Home(): ReactElement {
  return <Welcome />
}
