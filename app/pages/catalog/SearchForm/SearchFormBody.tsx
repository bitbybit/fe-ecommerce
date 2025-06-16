import { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { Search } from 'lucide-react'
import { Input } from '~/components/ui/Input'
import { Button } from '~/components/ui/Button'
import { type UseCatalogDataResult } from '../hooks/useCatalogData'
import { PRODUCT_LIST_ITEMS_PER_PAGE } from '~/api/namespaces/product'

type SearchFormBodyProperties = {
  fetch: UseCatalogDataResult['fetchProducts']
  setSearch: (search: string) => void
  onSearch: () => void
}

export function SearchFormBody({ fetch, setSearch, onSearch }: SearchFormBodyProperties): ReactElement {
  const { register, handleSubmit, getValues } = useForm<{ search: string }>()

  const onSubmit = (): Promise<void> => {
    onSearch()
    const { search } = getValues()
    setSearch(search)
    return fetch({ limit: PRODUCT_LIST_ITEMS_PER_PAGE }, [], [], search)
  }

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} className="p-2">
      <div className="flex w-full items-center gap-2">
        <Input
          type="text"
          className="h-[40px] border-blue-200 shadow-sm"
          placeholder="Search products..."
          {...register('search')}
        />
        <Button type="submit" variant="default" size="icon">
          <Search />
        </Button>
      </div>
    </form>
  )
}
