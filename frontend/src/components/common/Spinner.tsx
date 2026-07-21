interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'indigo' | 'white' | 'gray'
}

const sizeClass = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-9 h-9' }
const colorClass = {
  indigo: 'border-indigo-600 border-t-transparent',
  white:  'border-white border-t-transparent',
  gray:   'border-gray-400 border-t-transparent',
}

const Spinner = ({ size = 'md', color = 'indigo' }: Props) => (
  <div
    className={[
      'rounded-full border-2 animate-spin',
      sizeClass[size],
      colorClass[color],
    ].join(' ')}
  />
)

export default Spinner
