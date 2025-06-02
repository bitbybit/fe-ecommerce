import type { FieldValues, UseFormSetValue } from 'react-hook-form'

type FilterFormFieldsProperties = {
  setPriceRange: (name: string, range: [number, number]) => void
  setAttributeValue: (name: string, switched: string) => void
  setSwitcherState: (name: string, value: string) => void
}

/**
 * Returns handler functions for setting form filter values
 * @param setValue
 * @returns
 */
export function filterFormHandlers(setValue: UseFormSetValue<FieldValues>): FilterFormFieldsProperties {
  return {
    setPriceRange: (name: string, range: [number, number]): void => {
      setValue(name, range)
    },
    setAttributeValue: (name: string, value: string): void => {
      setValue(name, value)
    },
    setSwitcherState: (name: string, switched: string): void => {
      setValue(name, switched)
    }
  }
}
