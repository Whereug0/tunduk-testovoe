import { create } from 'zustand'

export type ToastVariant = 'success' | 'error'

export interface Toast {
  id: number
  variant: ToastVariant
  message: string
}

interface ToastState {
  toasts: Toast[]
  showToast: (variant: ToastVariant, message: string) => void
  dismissToast: (id: number) => void
}

let nextId = 1

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (variant, message) => {
    const id = nextId++
    set((state) => ({ toasts: [...state.toasts, { id, variant, message }] }))
  },
  dismissToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },
}))
