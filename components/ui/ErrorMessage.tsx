interface ErrorMessageProps {
  message: string
  retry?: () => void
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <div className="mb-4 text-5xl text-red-600">⚠️</div>
        <h2 className="mb-2 text-xl font-semibold text-red-900">
          Something went wrong
        </h2>
        <p className="mb-4 text-red-700">{message}</p>
        {retry && (
          <button
            onClick={retry}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
