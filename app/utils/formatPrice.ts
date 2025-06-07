const TO_CENT_DOLLAR = 100
const DOLLAR_SIGN = '$'

export const formatProductItemPrice = (centAmount?: number): string => {
  if (!centAmount) return 'N/A'
  return DOLLAR_SIGN + centAmount / TO_CENT_DOLLAR
}
