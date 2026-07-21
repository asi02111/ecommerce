import type { SelectHTMLAttributes } from 'react'

interface Option {
  value: string
  label: string
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Option[]
  placeholder?: string
  fullWidth?: boolean
}

const Select = ({
  label,
  error,
  options,
  placeholder,
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
      <select
        className={[
          'border-2 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors bg-white w-full appearance-none cursor-pointer',
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-gray-200 focus:border-indigo-500',
          'disabled:bg-gray-50 disabled:cursor-not-allowed',
          className,
        ].join(' ')}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default Select
