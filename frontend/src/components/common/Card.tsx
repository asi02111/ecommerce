import { Paper, type PaperProps } from '@mui/material'
import type { ReactNode } from 'react'

interface Props extends Omit<PaperProps, 'variant'> {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg' | 'none'
  hover?:   boolean
}

const paddingMap = { none: 0, sm: 1.5, md: 2.5, lg: 4 }

const Card = ({ children, padding = 'md', hover = false, sx, ...rest }: Props) => (
  <Paper
    elevation={0}
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      p: paddingMap[padding],
      transition: hover ? 'box-shadow .2s, transform .2s' : undefined,
      '&:hover': hover ? { boxShadow: '0 8px 24px rgba(0,0,0,.08)', transform: 'translateY(-2px)' } : undefined,
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Paper>
)

export default Card
