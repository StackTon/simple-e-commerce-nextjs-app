'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import {
  ToastContainer,
  ToastComponent,
  type Toast,
  type ToastType,
} from '@/components/ui/Toast'

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

let toastIdCounter = 0

function generateToastId(): string {
  toastIdCounter += 1
  return `toast-${toastIdCounter.toString()}-${Date.now().toString()}`
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration = 3000) => {
      // Prevent duplicate toasts with the same message and type
      setToasts((prev) => {
        const isDuplicate = prev.some(
          (existingToast) =>
            existingToast.message === message && existingToast.type === type,
        )

        if (isDuplicate) {
          return prev
        }

        const id = generateToastId()
        const toast: Toast = { id, message, type, duration }
        return [...prev, toast]
      })
    },
    [],
  )

  const success = useCallback(
    (message: string, duration = 3000) => {
      showToast(message, 'success', duration)
    },
    [showToast],
  )

  const error = useCallback(
    (message: string, duration = 4000) => {
      showToast(message, 'error', duration)
    },
    [showToast],
  )

  const info = useCallback(
    (message: string, duration = 3000) => {
      showToast(message, 'info', duration)
    },
    [showToast],
  )

  const warning = useCallback(
    (message: string, duration = 3000) => {
      showToast(message, 'warning', duration)
    },
    [showToast],
  )

  const value: ToastContextType = useMemo(
    () => ({
      showToast,
      success,
      error,
      info,
      warning,
    }),
    [showToast, success, error, info, warning],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onDismiss={dismissToast}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
