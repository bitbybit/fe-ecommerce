import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import type { ReactElement } from 'react'

export const LoginErrorAlert = (message: string): ReactElement => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Login Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
)
