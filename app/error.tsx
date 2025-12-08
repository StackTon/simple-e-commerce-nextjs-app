'use client'

import { Header } from '@/components/layout/Header'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <div className="mb-4 text-5xl text-red-600">⚠️</div>
            <h2 className="mb-2 text-2xl font-semibold text-red-900">
              Something went wrong
            </h2>
            <p className="mb-4 text-red-700">
              An unexpected error occurred. Please try again later.
            </p>
            <button
              onClick={() => {
                reset()
              }}
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
