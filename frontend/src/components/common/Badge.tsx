import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  variant?: 'indigo' | 'red' | 'green' | 'orange' | 'pink' | 'gray' | 'yellow'
  size?: 'sm' | 'md'
  dot?: boolean
}

const variantClass: Record<string, string> = {
  indigo: 'bg-indigo-100 text-indigo-700',
  red:    'bg-red-100    text-red-700',
  green:  'bg-green-100  text-green-700',
  orange: 'bg-orange-100 text-orange-700',
  pink:   'bg-pink-100   text-pink-600',
  gray:   'bg-gray-100   text-gray-600',
  yellow: 'bg-yellow-100 text-yellow-700',
}

const dotClass: Record<string, string> = {
  indigo: 'bg-indigo-500',
  red:    'bg-red-500',
  green:  'bg-green-500',
  orange: 'bg-orange-500',
  pink:   'bg-pink-500',
  gray:   'bg-gray-400',
  yellow: 'bg-yellow-500',
}

const sizeClass = {
  sm: 'text-xs px-2 py-0.5 rounded-md',
  md: 'text-xs px-2.5 py-1 rounded-lg',
}

const Badge = ({ children, variant = 'indigo', size = 'md', dot = false }: Props) => (
  <span className={['inline-flex items-center gap-1.5 font-semibold', variantClass[variant], sizeClass[size]].join(' ')}>
    {dot && <span className={['w-1.5 h-1.5 rounded-full', dotClass[variant]].join(' ')} />}
    {children}
  </span>
)

export default Badge
