import { Chip } from '@mui/material'
import type { ReactNode } from 'react'

type LegacyVariant = 'indigo' | 'red' | 'green' | 'orange' | 'pink' | 'gray' | 'yellow'

interface Props {
  children: ReactNode
  variant?: LegacyVariant
  size?:    'sm' | 'md'
  dot?:     boolean
}

// Legacy color নাম → MUI Chip color/style। theme পাল্টালেও 'indigo' মানেই primary color থাকবে।
const variantMap: Record<LegacyVariant, { color: 'primary' | 'error' | 'success' | 'warning' | 'secondary' | 'default'; sx?: object }> = {
  indigo: { color: 'primary'   },
  red:    { color: 'error'     },
  green:  { color: 'success'   },
  orange: { color: 'warning'   },
  pink:   { color: 'secondary' },
  gray:   { color: 'default'   },
  yellow: { color: 'warning', sx: { bgcolor: '#FEF3C7', color: '#92400E' } },
}

const Badge = ({ children, variant = 'indigo', size = 'md', dot = false }: Props) => {
  const { color, sx } = variantMap[variant]

  return (
    <Chip
      label={children}
      color={color}
      size={size === 'sm' ? 'small' : 'medium'}
      icon={dot ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', marginLeft: 6 }} /> : undefined}
      sx={{ fontWeight: 600, ...sx }}
    />
  )
}

export default Badge
