import type { ReactNode, ButtonHTMLAttributes } from 'react'
import Spinner from './Spinner'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

const variantClass: Record<string, string> = {
  primary:   'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm',
  secondary: 'bg-gray-800   hover:bg-gray-900   text-white shadow-sm',
  outline:   'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
  ghost:     'text-gray-600 hover:bg-gray-100',
  danger:    'bg-red-500    hover:bg-red-600    text-white shadow-sm',
  success:   'bg-green-500  hover:bg-green-600  text-white shadow-sm',
}

const sizeClass: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  ...rest
}: Props) => {
  return (
    <button
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed',
        variantClass[variant],
        sizeClass[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {loading && <Spinner size="sm" color="white" />}
      {children}
    </button>
  )
}

export default Button
