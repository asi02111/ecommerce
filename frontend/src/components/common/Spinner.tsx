import { CircularProgress } from '@mui/material'

interface Props {
  size?:  'sm' | 'md' | 'lg'
  color?: 'primary' | 'inherit' | 'secondary'
}

const sizeMap = { sm: 16, md: 24, lg: 36 }

const Spinner = ({ size = 'md', color = 'primary' }: Props) => (
  <CircularProgress size={sizeMap[size]} color={color} thickness={4} />
)

export default Spinner
