// TODO: move this logic inside getProducts()
// /**
//  *
//  * @param filters
//  * @returns string[]
//  */
// export function createFilterQueryArguments(filters: Filters): string[] {
//   const queryFilters: string[] = []
//
//   if (filters.price) {
//     queryFilters.push(`variants.price.centAmount:range(${filters.price.min} to ${filters.price.max})`)
//   }
//
//   for (const key in filters) {
//     if (key === 'price') continue
//     const value = filters[key]
//
//     if (key !== undefined && typeof value === 'string') {
//       if (key === 'model' || key === 'color') {
//         queryFilters.push(`variants.attributes.${key}.key:"${value}"`)
//       } else {
//         queryFilters.push(`variants.attributes.${key}:"${value}"`)
//       }
//     }
//   }
//   return queryFilters
// }
console.log('createFilterQuery')
