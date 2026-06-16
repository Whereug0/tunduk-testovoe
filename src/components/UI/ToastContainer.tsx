import { useEffect } from 'react'
import { useToastStore } from '../../store/toastStore'
import type { ToastVariant } from '../../store/toastStore'

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  const dismissToast = useToastStore((s) => s.dismissToast)

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          variant={toast.variant}
          message={toast.message}
          onDismiss={dismissToast}
        />
      ))}
    </div>
  )
}

interface ToastItemProps {
  id: number
  variant: ToastVariant
  message: string
  onDismiss: (id: number) => void
}

function ToastItem({ id, variant, message, onDismiss }: ToastItemProps) {
  useEffect(() => {
    const timeout = setTimeout(() => onDismiss(id), 4000)
    return () => clearTimeout(timeout)
  }, [id, onDismiss])

  return (
    <div
      role="status"
      className={`pointer-events-auto min-w-[240px] rounded-md border px-4 py-3 text-sm shadow-lg ${
        variant === 'success'
          ? 'border-green-300 bg-green-50 text-green-800'
          : 'border-red-300 bg-red-50 text-red-800'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span>{message}</span>
        <button
          type="button"
          onClick={() => onDismiss(id)}
          aria-label="Закрыть уведомление"
          className="text-current opacity-60 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
