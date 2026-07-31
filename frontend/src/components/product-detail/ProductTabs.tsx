import { Paper, Tabs, Tab, Box, Typography, Grid } from '@mui/material'
import type { Product } from '../../types'

interface Props {
  product: Product
  activeTab: number
  onChange: (tab: number) => void
}

const demoReviews = [
  { name: 'Rahim K.',   rating: 5, comment: 'Excellent quality! Very happy with the purchase. Fast delivery too.', date: '2 days ago'  },
  { name: 'Sumaiya T.', rating: 4, comment: 'Good product, matches the description. Sizing is accurate.',          date: '1 week ago'  },
  { name: 'Kamal H.',   rating: 5, comment: 'Best purchase this month! Highly recommended.',                       date: '2 weeks ago' },
]

const shippingOptions = [
  { icon: '🚀', title: 'Express Delivery',  desc: 'Dhaka: 1-2 days — ৳80'                 },
  { icon: '🚚', title: 'Standard Delivery', desc: 'Outside Dhaka: 3-5 days — ৳120'        },
  { icon: '🎁', title: 'Free Delivery',     desc: 'On orders above ৳999'                  },
]

const ProductTabs = ({ product, activeTab, onChange }: Props) => (
  <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3 }}>
    <Tabs
      value={activeTab}
      onChange={(_, v) => onChange(v)}
      sx={{ mb: 3, minHeight: 40, '& .MuiTabs-indicator': { height: 3, borderRadius: 3 } }}
    >
      <Tab label="Description" sx={{ minHeight: 40, textTransform: 'none', fontWeight: 700 }} />
      <Tab label="Reviews"     sx={{ minHeight: 40, textTransform: 'none', fontWeight: 700 }} />
      <Tab label="Shipping"    sx={{ minHeight: 40, textTransform: 'none', fontWeight: 700 }} />
    </Tabs>

    {activeTab === 0 && (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, color: 'text.secondary', fontSize: 14, lineHeight: 1.7 }}>
        <Typography variant="body2">
          This premium quality {product.name} is crafted with attention to detail and superior materials.
          Designed for everyday comfort and style, it features a modern fit that works for both casual and semi-formal occasions.
        </Typography>
        <Typography variant="body2">
          Available in multiple sizes, this piece is perfect for those who value both aesthetics and functionality.
          Easy to care for and built to last.
        </Typography>
        <Box component="ul" sx={{ pl: 2.5, m: 0, mt: 1 }}>
          {['Premium quality material', 'Comfortable and durable', 'Easy to wash and maintain', 'Available in multiple sizes'].map((li) => (
            <Typography key={li} component="li" variant="body2">{li}</Typography>
          ))}
        </Box>
      </Box>
    )}

    {activeTab === 1 && (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {demoReviews.map((review, i) => (
          <Box key={i} sx={{ pb: 2, borderBottom: i < demoReviews.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 0.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'primary.50', color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                  {review.name[0]}
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>{review.name}</Typography>
              </Box>
              <Typography variant="caption" color="text.disabled">{review.date}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 0.5 }}>
              {Array.from({ length: 5 }, (_, j) => (
                <Typography key={j} sx={{ fontSize: 13, color: j < review.rating ? '#FBBF24' : 'grey.300' }}>★</Typography>
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
          </Box>
        ))}
      </Box>
    )}

    {activeTab === 2 && (
      <Grid container spacing={2}>
        {shippingOptions.map((item) => (
          <Grid size={{ xs: 12, md: 4 }} key={item.title}>
            <Box sx={{ bgcolor: 'grey.50', borderRadius: 2.5, p: 2 }}>
              <Typography sx={{ fontSize: 24, mb: 1 }}>{item.icon}</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>{item.title}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.3, display: 'block' }}>{item.desc}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    )}
  </Paper>
)

export default ProductTabs
