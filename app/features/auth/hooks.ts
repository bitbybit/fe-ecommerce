import { useMatches } from 'react-router'
import { useMemo } from 'react'

/**
 * Is `/auth/login` page
 * @returns Boolean result
 */
export function useIsLogin(): boolean {
  const matches = useMatches()
  const pathname = matches.at(-1)?.pathname ?? ''

  return useMemo(() => pathname.endsWith('/login'), [pathname])
}
