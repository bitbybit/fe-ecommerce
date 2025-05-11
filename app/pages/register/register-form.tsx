import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { signUp, AUTH_STATUS } from '~/store/auth'
import {
  cityRule,
  countryRule,
  dateOfBirthRule,
  emailRule,
  firstNameRule,
  lastNameRule,
  passwordRule,
  postalCodeRule,
  streetNameRule
} from '~/utils/validation'

const schema = z.object({
  city: cityRule,
  country: countryRule,
  dateOfBirth: dateOfBirthRule,
  email: emailRule,
  firstName: firstNameRule,
  lastName: lastNameRule,
  password: passwordRule,
  postalCode: postalCodeRule,
  streetName: streetNameRule
})

const defaultValues = {
  city: '',
  country: '', // TODO: set default country
  dateOfBirth: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  postalCode: '',
  streetName: ''
}

const FormEmailField = (form: ReturnType<typeof useForm<z.infer<typeof schema>>>): ReactElement => {
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

const FormPasswordField = (form: ReturnType<typeof useForm<z.infer<typeof schema>>>): ReactElement => {
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const FormFirstNameField = (form: ReturnType<typeof useForm<z.infer<typeof schema>>>): ReactElement => {
  return (
    <FormField
      control={form.control}
      name="firstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input placeholder="First name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const FormLastNameField = (form: ReturnType<typeof useForm<z.infer<typeof schema>>>): ReactElement => {
  return (
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input placeholder="Last name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const FormDateOfBirthField = (form: ReturnType<typeof useForm<z.infer<typeof schema>>>): ReactElement => {
  return (
    <FormField
      control={form.control}
      name="dateOfBirth"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date of Birth</FormLabel>
          <FormControl>
            <Input placeholder="Date of Birth" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const FormCountryField = (form: ReturnType<typeof useForm<z.infer<typeof schema>>>): ReactElement => {
  return (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country</FormLabel>
          <FormControl>
            <Input placeholder="Country" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const FormCityField = (form: ReturnType<typeof useForm<z.infer<typeof schema>>>): ReactElement => {
  return (
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input placeholder="City" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const FormStreetNameField = (form: ReturnType<typeof useForm<z.infer<typeof schema>>>): ReactElement => {
  return (
    <FormField
      control={form.control}
      name="streetName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Street name</FormLabel>
          <FormControl>
            <Input placeholder="Street name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const FormPostalCodeField = (form: ReturnType<typeof useForm<z.infer<typeof schema>>>): ReactElement => {
  return (
    <FormField
      control={form.control}
      name="postalCode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Postal code</FormLabel>
          <FormControl>
            <Input placeholder="Postal code" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const RegisterForm = (): ReactElement => {
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const handleRegister = (payload: z.infer<typeof schema>): void => {
    void dispatch(signUp(payload))
  }

  return (
    <>
      {status === AUTH_STATUS.ERROR && <div>{errorMessage}</div>}

      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(handleRegister)(event)} className="space-y-6">
          <FormEmailField {...form} />
          <FormPasswordField {...form} />
          <FormFirstNameField {...form} />
          <FormLastNameField {...form} />
          <FormDateOfBirthField {...form} />
          <FormCountryField {...form} />
          <FormCityField {...form} />
          <FormStreetNameField {...form} />
          <FormPostalCodeField {...form} />

          <Button type="submit" disabled={status === AUTH_STATUS.LOADING}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
