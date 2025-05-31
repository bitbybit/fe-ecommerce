/**
 *
 * @param attribute
 * @param value
 * @returns string
 */
export function formatAttributeValue(attribute: string, value: string): string {
  const VALUE_FALSE = 'F'
  const VALUE_TRUE = 'T'
  if (value === VALUE_FALSE) return 'No'
  if (value === VALUE_TRUE) return 'Yes'

  if (attribute.includes('weight')) {
    return `${Number(value)} kg`
  }
  if (attribute.includes('height') || attribute.includes('width')) {
    return `${Number(value)} cm`
  }

  return value
}
