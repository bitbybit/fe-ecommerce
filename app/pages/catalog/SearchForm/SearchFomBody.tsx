import { useForm } from 'react-hook-form'
import type { UseCatalogDataResult } from '../hooks/useCatalogData'
import type { ReactElement } from 'react'
import { Input } from '~/components/ui/Input'
import { Button } from '~/components/ui/Button'
import { Search } from 'lucide-react'
import { PRODUCTS_LIMIT } from '../FilterForm/FilterFormBody'

type SearchFormBodyProperties = { fetch: UseCatalogDataResult['fetchProducts'] }

export function SearchFormBody({ fetch }: SearchFormBodyProperties): ReactElement {
  const { register, handleSubmit, getValues } = useForm<{ search: string }>()

  function onSubmit(): void {
    const { search } = getValues()
    void fetch({ limit: PRODUCTS_LIMIT }, [], [], search)
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
