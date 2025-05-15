import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { signUp, AUTH_STATUS } from '~/store/auth'
import { createFormField, type FormType } from '~/utils/form'
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

type SchemaType = typeof schema

const EmailField = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Email',
    name: 'email',
    props: { type: 'email', placeholder: 'Email' }
  })

const PasswordField = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Password',
    name: 'password',
    props: { type: 'password', placeholder: 'Password', autoComplete: 'new-password' }
  })

const FirstNameField = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'First Name',
    name: 'firstName',
    props: { placeholder: 'First name' }
  })

const LastNameField = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Last Name',
    name: 'lastName',
    props: { placeholder: 'Last name' }
  })

const DateOfBirthField = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Date of Birth',
    name: 'dateOfBirth',
    props: { placeholder: 'Date of Birth' }
  })

const CountryField = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Country',
    name: 'country',
    props: { placeholder: 'Country' }
  })

const CityField = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'City',
    name: 'city',
    props: { placeholder: 'City' }
  })

const StreetNameField = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Street name',
    name: 'streetName',
    props: { placeholder: 'Street name' }
  })

const PostalCodeField = (form: FormType<SchemaType>): ReactElement =>
  createFormField<SchemaType>({
    form,
    label: 'Postal code',
    name: 'postalCode',
    props: { placeholder: 'Postal code' }
  })

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
          <EmailField {...form} />
          <PasswordField {...form} />
          <FirstNameField {...form} />
          <LastNameField {...form} />
          <DateOfBirthField {...form} />
          <CountryField {...form} />
          <CityField {...form} />
          <StreetNameField {...form} />
          <PostalCodeField {...form} />

          <Button type="submit" disabled={status === AUTH_STATUS.LOADING}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
