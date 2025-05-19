import { type ReactElement } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

export const ErrorAlert = (message: string): ReactElement => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Login Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
)
