import { fetchProducts } from '@/lib/api/products'
import { PAGINATION } from '@/lib/constants'
import { Header } from '@/components/layout/Header'
import { ProductGrid } from '@/components/products/ProductGrid'
import { SearchBar } from '@/components/ui/SearchBar'
import { Pagination } from '@/components/ui/Pagination'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import {
  sanitizeSearchInput,
  sanitizeNumericInput,
} from '@/lib/utils/validation'

interface HomePageProps {
  searchParams: Promise<{
    search?: string
    page?: string
  }>
}

async function fetchProductsData(limit: number, skip: number, search?: string) {
  try {
    return await fetchProducts({ limit, skip, search })
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to load products',
    }
  }
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams
  const search = params.search ? sanitizeSearchInput(params.search) : undefined
  const page = sanitizeNumericInput(params.page, 1, 1, 1000)
  const skip = (page - 1) * PAGINATION.DEFAULT_LIMIT

  const result = await fetchProductsData(PAGINATION.DEFAULT_LIMIT, skip, search)

  if ('error' in result) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ErrorMessage message={result.error} />
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            {search ? `Search results for "${search}"` : 'All Products'}
          </h1>

          <div className="mb-6">
            <SearchBar />
          </div>

          <p className="text-gray-600">
            Showing {result.products.length} of {result.total} products
          </p>
        </div>

        <ProductGrid products={result.products} />

        <Pagination total={result.total} currentPage={page} />
      </main>
    </>
  )
}
