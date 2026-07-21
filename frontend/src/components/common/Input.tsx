import type { InputHTMLAttributes, ReactNode } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const Input = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  ...rest
}: Props) => {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          className={[
            'border-2 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors w-full',
            leftIcon ? 'pl-9' : '',
            rightIcon ? 'pr-9' : '',
            error
              ? 'border-red-400 focus:border-red-500 bg-red-50'
              : 'border-gray-200 focus:border-indigo-500 bg-white',
            'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
            className,
          ].join(' ')}
          {...rest}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {hint && !error && <p className="text-gray-400 text-xs mt-1">{hint}</p>}
    </div>
  )
}

export default Input
