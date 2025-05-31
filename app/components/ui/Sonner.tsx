import { type CSSProperties, type ReactElement } from 'react'
import { useTheme } from 'next-themes'
import { type ToasterProps } from 'sonner'
import { Toaster as Sonner } from 'sonner'

export const Toaster = ({ ...properties }: ToasterProps): ReactElement => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)'
        } as CSSProperties
      }
      {...properties}
    />
  )
}
