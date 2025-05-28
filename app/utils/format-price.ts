const TO_CENT_DOLLAR = 100
const DOLLAR_SIGN = '$'

/**
 *
 * @param centAmount
 * @returns String with formatted price in dollars (for example, '$19.99')
 */
export function formatPoductItemPrice(centAmount?: number): string {
  if (!centAmount) return 'N/A'
  return DOLLAR_SIGN + centAmount / TO_CENT_DOLLAR
}
