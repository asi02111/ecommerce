import { useEffect } from 'react'

export interface ToastData {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

interface Props {
  toasts: ToastData[]
  onRemove: (id: string) => void
}

const typeClass: Record<string, string> = {
  success: 'bg-green-500',
  error:   'bg-red-500',
  warning: 'bg-orange-500',
  info:    'bg-indigo-600',
}

const typeIcon: Record<string, string> = {
  success: '✅',
  error:   '❌',
  warning: '⚠️',
  info:    'ℹ️',
}

const ToastItem = ({ toast, onRemove }: { toast: ToastData; onRemove: (id: string) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000)
    return () => clearTimeout(timer)
  }, [toast.id, onRemove])

  return (
    <div
      className={[
        'flex items-center gap-3 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium min-w-64 animate-fade-in',
        typeClass[toast.type],
      ].join(' ')}
    >
      <span>{typeIcon[toast.type]}</span>
      <span className="flex-1">{toast.message}</span>
      <button onClick={() => onRemove(toast.id)} className="opacity-70 hover:opacity-100">✕</button>
    </div>
  )
}

// Toast container — App.tsx এ রাখতে হবে
const Toast = ({ toasts, onRemove }: Props) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

export default Toast
