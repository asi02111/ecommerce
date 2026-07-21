import { createContext, useState, useCallback, type ReactNode } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 3000)
  }, [removeToast])

  const success = useCallback((msg: string) => showToast(msg, 'success'), [showToast])
  const error   = useCallback((msg: string) => showToast(msg, 'error'),   [showToast])
  const warning = useCallback((msg: string) => showToast(msg, 'warning'), [showToast])
  const info    = useCallback((msg: string) => showToast(msg, 'info'),    [showToast])

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast, success, error, warning, info }}>
      {children}

      {/* Toast UI — সব page এ দেখাবে */}
      {toasts.length > 0 && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium min-w-64 text-white ${
                toast.type === 'success' ? 'bg-green-500' :
                toast.type === 'error'   ? 'bg-red-500'   :
                toast.type === 'warning' ? 'bg-orange-500':
                'bg-indigo-600'
              }`}
            >
              <span>
                {toast.type === 'success' ? '✅' :
                 toast.type === 'error'   ? '❌' :
                 toast.type === 'warning' ? '⚠️' : 'ℹ️'}
              </span>
              <span className="flex-1">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="opacity-70 hover:opacity-100">✕</button>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}
