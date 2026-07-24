import { Snackbar, Alert } from '@mui/material'

export interface ToastData {
  id:      string
  message: string
  type:    'success' | 'error' | 'warning' | 'info'
}

interface Props {
  toasts:   ToastData[]
  onRemove: (id: string) => void
}

// একসাথে stack করে দেখানো — নিচ থেকে উপরে সাজানো
const Toast = ({ toasts, onRemove }: Props) => (
  <>
    {toasts.map((toast, i) => (
      <Snackbar
        key={toast.id}
        open
        autoHideDuration={3000}
        onClose={() => onRemove(toast.id)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ bottom: `${16 + i * 60}px !important` }}
      >
        <Alert
          onClose={() => onRemove(toast.id)}
          severity={toast.type}
          variant="filled"
          sx={{ borderRadius: 2.5, minWidth: 260, fontWeight: 500 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    ))}
  </>
)

export default Toast
