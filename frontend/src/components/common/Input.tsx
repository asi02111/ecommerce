import { TextField, InputAdornment, type TextFieldProps } from '@mui/material'
import type { ReactNode } from 'react'

interface Props extends Omit<TextFieldProps, 'variant' | 'error'> {
  error?:    string
  hint?:     string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const Input = ({
  error,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = true,
  helperText,
  ...rest
}: Props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth={fullWidth}
      error={!!error}
      helperText={error || hint || helperText}
      slotProps={{
        input: {
          startAdornment: leftIcon && <InputAdornment position="start">{leftIcon}</InputAdornment>,
          endAdornment:   rightIcon && <InputAdornment position="end">{rightIcon}</InputAdornment>,
        },
      }}
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
      {...rest}
    />
  )
}

export default Input
