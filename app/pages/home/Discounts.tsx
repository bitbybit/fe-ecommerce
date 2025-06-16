import { type ReactElement } from 'react'
import { useDiscountsData } from './hooks/useDiscountsData'
import { Card, CardContent, CardDescription, CardTitle } from '~/components/ui/Card'
import { H2 } from '~/components/ui/typography'

export function Discounts(): ReactElement {
  const { discounts } = useDiscountsData()

  if (discounts.length === 0) {
    return <></>
  }

  return (
    <div className="mt-6 mx-3">
      <H2 className="text-center mb-6">Discounts</H2>
      <div className="flex gap-3">
        {discounts.map(({ id, code, description }) => (
          <Card key={id} className="flex-grow max-w-1/2 p-2">
            <CardContent className="p-2">
              <CardTitle className="mb-2">{code}</CardTitle>
              {description !== undefined && <CardDescription>{description['en-US']}</CardDescription>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
