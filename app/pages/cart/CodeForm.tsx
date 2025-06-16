import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '~/components/ui/Form'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { Input } from '~/components/ui/Input'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { applyCode } from '~/store/cart'
import { CART_TABLE_STATUS } from '~/store/cart/types'

const schema = z.object({
  code: z.string()
})

const defaultValues = {
  code: ''
}

export type SchemaType = typeof schema

export const CodeForm = (): ReactElement => {
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.cart)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const handleApplyCode = (payload: z.infer<SchemaType>): void => void dispatch(applyCode(payload))

  return (
    <Card className="md:min-w-lg m-6 gap-2">
      <CardHeader>
        <CardTitle>APPLY CODE</CardTitle>
      </CardHeader>
      {status === CART_TABLE_STATUS.ERROR && <div className="px-6 text-red-900">{errorMessage}</div>}
      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(handleApplyCode)(event)}>
          <fieldset disabled={status === CART_TABLE_STATUS.LOADING}>
            <CardContent className="flex gap-2">
              <Input type="text" placeholder="Code" {...form.register('code')} />
              <Button type="submit">Submit</Button>
            </CardContent>
          </fieldset>
        </form>
      </Form>
    </Card>
  )
}
