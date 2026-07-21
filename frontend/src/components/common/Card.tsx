import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'none'
  hover?: boolean
}

const paddingClass = {
  none: '',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-8',
}

const Card = ({ children, className = '', padding = 'md', hover = false }: Props) => (
  <div
    className={[
      'bg-white rounded-2xl border border-gray-100 shadow-sm',
      paddingClass[padding],
      hover ? 'hover:shadow-md transition-shadow duration-300' : '',
      className,
    ].join(' ')}
  >
    {children}
  </div>
)

export default Card
