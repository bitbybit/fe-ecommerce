import { useState, type ReactElement } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { signIn, AUTH_STATUS } from '~/store/auth'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { emailRule, passwordRule } from '~/utils/validation'
import { IoEye, IoEyeOff } from 'react-icons/io5'

const loginSchema = z.object({
  email: emailRule,
  password: passwordRule
})

const defaultValues = {
  email: '',
  password: ''
}

const FormEmailField = (form: ReturnType<typeof useForm<z.infer<typeof loginSchema>>>): ReactElement => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const FormPasswordField = (form: ReturnType<typeof useForm<z.infer<typeof loginSchema>>>): ReactElement => {
  const [show, setShow] = useState(false)

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input type={show ? 'text' : 'password'} placeholder="Password" {...field} />
              <div onClick={(): void => setShow(!show)} className="absolute right-2 top-2.5">
                {show ? <IoEye /> : <IoEyeOff />}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues
  })

  const handleLogin = (payload: z.infer<typeof loginSchema>): void => {
    void dispatch(signIn(payload))
  }

  return (
    <>
      {status === AUTH_STATUS.ERROR && <div>{errorMessage}</div>}

      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(handleLogin)(event)}
          className="block mx-auto bg-[#f8f9fa] rounded-lg space-y-6 max-w-xs mt-[20px] mb-[20px] p-[25px]"
        >
          <FormEmailField {...form} />
          <FormPasswordField {...form} />

          <Button type="submit" className="block mx-auto" disabled={status === AUTH_STATUS.LOADING}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
