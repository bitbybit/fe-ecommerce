import { type ReactElement } from 'react'
import { useDiscountsData } from './hooks/useDiscountsData'
import { Card, CardContent, CardDescription, CardTitle } from '~/components/ui/Card'
import { H2 } from '~/components/ui/typography'
import { LANG } from '~/api/client'

export function Discounts(): ReactElement {
  const { discounts } = useDiscountsData()

  if (discounts.length === 0) {
    return <></>
  }

  return (
    <div className="mt-6 mx-3">
      <H2 className="text-center mb-6">Discount codes</H2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {discounts.map(({ id, code, description }) => (
          <Card key={id} className="flex-grow w-full max-w-xs p-2 border-black p-2">
            <CardContent className="p-2">
              <CardTitle className="mb-2 animate-bounce bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent text-center">
                {code}
              </CardTitle>
              {description !== undefined && (
                <CardDescription className="text-center text-violet-950">{description[LANG]}</CardDescription>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
