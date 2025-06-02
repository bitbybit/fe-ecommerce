export type ProductListAppliedSort = {
  key: 'name.en-US' | 'price'
  value: 'asc' | 'desc'
}[]

export type SortOption = {
  key: string
  value: string
  label: string
}

export type ProductListSort = {
  key: 'sort'
  label: 'Sort'
  options: SortOption[]
}

export const sort: ProductListSort = {
  key: 'sort',
  label: 'Sort',
  options: [
    {
      key: 'name',
      value: 'asc',
      label: 'name: ASC'
    },
    {
      key: 'name',
      value: 'desc',
      label: 'name: DESC'
    },
    {
      key: 'price',
      value: 'asc',
      label: 'price: ASC'
    },
    {
      key: 'price',
      value: 'desc',
      label: 'price: DESC'
    }
  ]
}
