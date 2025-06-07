import { format } from 'date-fns'

export const formatDateOfBirth = (date: string | number | Date): string => {
  return format(date, 'PPP')
}

export const formatDateForSdk = (date: string | number | Date): string => {
  return format(date, 'yyyy-MM-dd')
}
