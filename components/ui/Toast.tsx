'use client'

import { useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastProps {
  toast: Toast
  onDismiss: (id: string) => void
}

export function ToastComponent({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const duration = toast.duration ?? 3000
    const timer = setTimeout(() => {
      onDismiss(toast.id)
    }, duration)

    return () => {
      clearTimeout(timer)
    }
  }, [toast.id, toast.duration, onDismiss])

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  }

  return (
    <div
      className={`pointer-events-auto mb-2 flex max-w-md min-w-64 items-center justify-between rounded-lg border px-4 py-3 shadow-lg ${colors[toast.type]}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold" aria-hidden="true">
          {icons[toast.type]}
        </span>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          onDismiss(toast.id)
        }}
        className="ml-4 text-lg font-bold opacity-70 hover:opacity-100"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  )
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="pointer-events-none fixed top-0 right-0 z-50 flex flex-col items-end p-4"
      aria-label="Notifications"
    >
      {children}
    </div>
  )
}
