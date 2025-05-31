import { useEffect } from 'react'

/**
 * Set document title
 * @param title
 */
export function useTitle(title: string): void {
  useEffect(() => {
    document.title = title
  }, [title])
}
