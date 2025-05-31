import { type ReactElement } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/Alert'

export const ErrorAlert = (message: string): ReactElement => (
  <Alert variant="destructive" className="m-0">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
)
