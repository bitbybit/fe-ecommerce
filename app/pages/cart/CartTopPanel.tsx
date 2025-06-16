import type { ReactElement } from 'react'
import { Card, CardContent } from '~/components/ui/Card'
import { CartTotalPrice } from './CartTotalPrice'
import { ClearCartButton } from './ClearCartButton'
import type { Cart } from '@commercetools/platform-sdk'

type CartTopPanelProperties = {
  cart?: Cart
  onClearCart: () => void
}

export function CartTopPanel({ cart, onClearCart }: CartTopPanelProperties): ReactElement {
  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="flex justify-between items-center gap-2 flex-wrap">
        {cart && <CartTotalPrice totalPrice={cart?.totalPrice?.centAmount} discount={cart?.discountOnTotalPrice} />}
        <ClearCartButton onClearCart={onClearCart} />
      </CardContent>
    </Card>
  )
}
