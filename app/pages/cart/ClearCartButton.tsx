import { type ReactElement } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/AlertDialog'
import { Button } from '~/components/ui/Button'
import { CART_TABLE_STATUS } from '~/store/cart/types'
import { useAppSelector } from '~/store/hooks'

type ClearCartButtonProps = { onClearCart: () => void }

export function ClearCartButton({ onClearCart }: ClearCartButtonProps): ReactElement {
  const { status } = useAppSelector((state) => state.cart)
  const isCartLoading = status === CART_TABLE_STATUS.LOADING

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" disabled={isCartLoading}>
          Clear Shopping Cart
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all products from your cart. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClearCart}>Yes, clear it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
