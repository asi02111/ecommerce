import { Button as MuiButton, CircularProgress, type ButtonProps as MuiButtonProps } from '@mui/material'
import type { ReactNode } from 'react'

// আগের Tailwind Button এর variant নাম গুলো MUI এর variant+color এ map করা —
// তাই বাকি সব জায়গায় <Button variant="success">, variant="danger" লেখা code
// একই থাকবে, শুধু ভেতরে MUI render হবে।
type LegacyVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'

interface Props extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  children:  ReactNode
  variant?:  LegacyVariant
  size?:     'sm' | 'md' | 'lg'
  loading?:  boolean
  fullWidth?: boolean
}

const variantMap: Record<LegacyVariant, { variant: MuiButtonProps['variant']; color: MuiButtonProps['color'] }> = {
  primary:   { variant: 'contained', color: 'primary'   },
  secondary: { variant: 'contained', color: 'secondary' },
  outline:   { variant: 'outlined', color: 'primary'    },
  ghost:     { variant: 'text',     color: 'inherit'    },
  danger:    { variant: 'contained', color: 'error'     },
  success:   { variant: 'contained', color: 'success'   },
}

const sizeMap: Record<'sm' | 'md' | 'lg', MuiButtonProps['size']> = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  ...rest
}: Props) => {
  const { variant: muiVariant, color } = variantMap[variant]

  return (
    <MuiButton
      variant={muiVariant}
      color={color}
      size={sizeMap[size]}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
      {...rest}
    >
      {children}
    </MuiButton>
  )
}

export default Button
