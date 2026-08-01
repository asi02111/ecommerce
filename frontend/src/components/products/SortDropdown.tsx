import { Select } from '../common'
import type { SortOption } from '../../hooks/useProductFilters'

interface Props {
  value: SortOption
  onChange: (value: SortOption) => void
}

const options = [
  { value: 'featured',   label: 'Featured'          },
  { value: 'price-low',  label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated'          },
  { value: 'newest',     label: 'Newest First'       },
]

const SortDropdown = ({ value, onChange }: Props) => (
  <Select
    value={value}
    onChange={(e) => onChange(e.target.value as SortOption)}
    options={options}
    size="small"
    sx={{ minWidth: 190 }}
  />
)

export default SortDropdown
