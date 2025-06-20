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
    <div className="mt-6 mx-3 w-full max-w-[1280px] px-8 font-about flex flex-col items-center lg:items-start gap-y-8">
      <H2 className="text-4xl font-light">Promo codes</H2>
      <div className="flex gap-6 flex-wrap lg:flex-nowrap justify-center lg:justify-start">
        {discounts.map(({ id, code, description }) => (
          <Card key={id} className="flex-grow w-full max-w-xs p-2 border-black p-2 mx-0 border-amber-500">
            <CardContent className="p-2">
              <CardTitle className="mb-2 animate-bounce text-center text-amber-500 font-light">{code}</CardTitle>
              {description !== undefined && (
                <CardDescription className="text-center font-light text-black">{description[LANG]}</CardDescription>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
