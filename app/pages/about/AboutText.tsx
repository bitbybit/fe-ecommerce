import { type ReactElement } from 'react'
import { H1, P } from '~/components/ui/typography'

export function AboutText({ text }: { text: string }): ReactElement {
  return (
    <div className="max-w-7xl mx-auto text-left">
      <H1 className="text-4xl font-bold mb-6 text-center">About us</H1>
      {text.split('\n\n').map((paragraph, index) => (
        <P key={index} className="text-lg text-muted-foreground mb-6">
          {paragraph}
        </P>
      ))}
    </div>
  )
}
