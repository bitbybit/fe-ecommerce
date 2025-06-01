import { format } from 'date-fns'

export const formatDateOfBirth = (date: string | number | Date): string => {
  return format(date, 'PPP')
}
