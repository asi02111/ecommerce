import { Box } from '@mui/material'
import { Badge } from '../common'
import type { Product } from '../../types'

interface Props {
  product: Product
  discount: number
}

// height: '100%' + flex column — main image flex:1 করে যতটুকু জায়গা পাওয়া যায় (ডান পাশের
// ProductInfo যত লম্বা হয়) ততটুকু নিয়ে নেয়, thumbnail row নিচে fixed height এ থাকে।
const ProductGallery = ({ product, discount }: Props) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, height: '100%' }}>

    {/* Main image — flex:1 করে বাকি column এর সমান height নেয় */}
    <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', bgcolor: 'grey.50', flex: 1, minHeight: 320 }}>
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {product.badge && (
        <Box sx={{ position: 'absolute', top: 14, left: 14 }}>
          <Badge variant={product.badge === 'Sale' ? 'red' : product.badge === 'Hot' ? 'orange' : 'indigo'}>
            {product.badge}
          </Badge>
        </Box>
      )}
      {discount > 0 && (
        <Box sx={{ position: 'absolute', top: 14, right: 14 }}>
          <Badge variant="green">-{discount}%</Badge>
        </Box>
      )}
    </Box>

    {/* Thumbnails — fixed height, নিচে থাকে */}
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, flexShrink: 0 }}>
      {Array.from({ length: 4 }, (_, i) => (
        <Box
          key={i}
          sx={{
            borderRadius: 2, overflow: 'hidden', aspectRatio: '1/1', cursor: 'pointer',
            border: '2px solid', borderColor: i === 0 ? 'primary.main' : 'transparent',
            '&:hover': { borderColor: i === 0 ? 'primary.main' : 'grey.300' },
          }}
        >
          <Box component="img" src={product.image} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      ))}
    </Box>
  </Box>
)

export default ProductGallery