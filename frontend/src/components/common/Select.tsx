import { TextField, MenuItem, type TextFieldProps } from '@mui/material'

interface Option {
  value: string
  label: string
}

interface Props extends Omit<TextFieldProps, 'select' | 'error'> {
  error?:       string
  options:      Option[]
  placeholder?: string
  fullWidth?:   boolean
}

const Select = ({ error, options, placeholder, fullWidth = true, helperText, ...rest }: Props) => (
  <TextField
    select
    fullWidth={fullWidth}
    error={!!error}
    helperText={error || helperText}
    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
    {...rest}
  >
    {placeholder && (
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>
    )}
    {options.map((opt) => (
      <MenuItem key={opt.value} value={opt.value}>
        {opt.label}
      </MenuItem>
    ))}
  </TextField>
)

export default Select
