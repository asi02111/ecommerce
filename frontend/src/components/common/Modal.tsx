import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { ReactNode } from 'react'

interface Props {
  isOpen:  boolean
  onClose: () => void
  title?:  string
  children: ReactNode
  size?:   'sm' | 'md' | 'lg'
}

const sizeMap = { sm: 'xs', md: 'sm', lg: 'md' } as const

const Modal = ({ isOpen, onClose, title, children, size = 'md' }: Props) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    maxWidth={sizeMap[size]}
    fullWidth
    slotProps={{ paper: { sx: { borderRadius: 4 } } }}
  >
    {title && (
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 800 }}>
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
    )}
    <DialogContent>{children}</DialogContent>
  </Dialog>
)

export default Modal
