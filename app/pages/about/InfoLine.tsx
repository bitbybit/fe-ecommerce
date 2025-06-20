import type { ReactElement } from 'react'
import { P } from '~/components/ui/typography'

export function InfoLine({ label, text }: { label: string; text?: string }): ReactElement | undefined {
  if (!text) return undefined
  return (
    <P className="!mt-1">
      <span className="font-bold">{label}:</span> {text}
    </P>
  )
}
