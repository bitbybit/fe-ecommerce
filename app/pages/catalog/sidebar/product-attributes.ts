export type AttributeType = 'set:lenum' | 'boolean' | 'number' | undefined

export interface AttributeProperties {
  name: string
  label: string
  type: AttributeType
}

export const PRODUCT_ATTRIBUTES: AttributeProperties[] = [
  {
    name: 'color',
    label: 'Color',
    type: 'set:lenum'
  },
  {
    name: 'max-weight',
    label: 'Max Weight (kg)',
    type: 'number'
  },
  {
    name: 'height-adjustable',
    label: 'Height Adjustable',
    type: 'boolean'
  },
  {
    name: 'height',
    label: 'Height (cm)',
    type: 'number'
  },
  {
    name: 'width',
    label: 'Width (cm)',
    type: 'number'
  },
  {
    name: 'mounts-to-desk',
    label: 'Is desk mountable',
    type: 'boolean'
  },
  {
    name: 'magsafe-support',
    label: 'Magsafe support',
    type: 'boolean'
  },
  {
    name: 'model',
    label: 'Model',
    type: 'set:lenum'
  }
]
