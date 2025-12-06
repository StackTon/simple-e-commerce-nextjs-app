import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Page Not Found
          </h2>
          <p className="mb-8 max-w-md text-center text-gray-600">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  )
}
