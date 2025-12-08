'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { PAGINATION } from '@/lib/constants'

interface PaginationProps {
  total: number
  currentPage: number
}

export function Pagination({ total, currentPage }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const totalPages = Math.ceil(total / PAGINATION.DEFAULT_LIMIT)

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => {
          handlePageChange(currentPage - 1)
        }}
        disabled={currentPage === 1}
        className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        {currentPage > 2 && (
          <>
            <button
              onClick={() => {
                handlePageChange(1)
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              1
            </button>
            {currentPage > 3 && <span className="text-gray-400">...</span>}
          </>
        )}

        {currentPage > 1 && (
          <button
            onClick={() => {
              handlePageChange(currentPage - 1)
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {currentPage - 1}
          </button>
        )}

        <button
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white"
          disabled
        >
          {currentPage}
        </button>

        {currentPage < totalPages && (
          <button
            onClick={() => {
              handlePageChange(currentPage + 1)
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {currentPage + 1}
          </button>
        )}

        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && (
              <span className="text-gray-400">...</span>
            )}
            <button
              onClick={() => {
                handlePageChange(totalPages)
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => {
          handlePageChange(currentPage + 1)
        }}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        Next
      </button>
    </div>
  )
}
