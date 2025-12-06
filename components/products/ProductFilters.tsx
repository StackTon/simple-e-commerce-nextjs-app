'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchCategories } from '@/lib/api/products'
import { capitalize } from '@/lib/utils/format'

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const currentCategory = searchParams.get('category') ?? ''

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    void loadCategories()
  }, [])

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (category) {
      params.set('category', category)
      params.delete('page') // Reset to page 1 on filter change
      params.delete('search') // Clear search when filtering by category
    } else {
      params.delete('category')
    }

    router.push(`/?${params.toString()}`, { scroll: false })
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 rounded-lg bg-gray-200"></div>
      </div>
    )
  }

  return (
    <div>
      <select
        value={currentCategory}
        onChange={(e) => {
          handleCategoryChange(e.target.value)
        }}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {capitalize(category)}
          </option>
        ))}
      </select>
    </div>
  )
}
