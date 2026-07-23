import { Box, Paper, Typography, Chip, Button, Stack, Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import type { ReactElement } from 'react'

const orders = [
  {
    id: 'ORD-12345', date: '20 Jan 2025', total: 4750, status: 'delivered', items: [
      { name: 'Classic White Oxford Shirt', qty: 2, price: 850,  image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=80&q=80' },
      { name: 'Wireless Earbuds Pro',       qty: 1, price: 2800, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=80&q=80' },
    ],
  },
  {
    id: 'ORD-12289', date: '12 Jan 2025', total: 3200, status: 'shipped', items: [
      { name: 'Running Shoes X200', qty: 1, price: 3200, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=80' },
    ],
  },
  {
    id: 'ORD-12100', date: '5 Jan 2025', total: 1100, status: 'pending', items: [
      { name: 'Floral Summer Dress', qty: 1, price: 1100, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=80&q=80' },
    ],
  },
]

const statusConfig: Record<
  string,
  {
    label: string
    color: 'success' | 'info' | 'warning'
    icon: ReactElement
  }
> = {
  delivered: {
    label: 'Delivered',
    color: 'success',
    icon: <CheckCircleOutlineIcon fontSize="small" />,
  },
  shipped: {
    label: 'Shipped',
    color: 'info',
    icon: <LocalShippingOutlinedIcon fontSize="small" />,
  },
  pending: {
    label: 'Pending',
    color: 'warning',
    icon: <PendingOutlinedIcon fontSize="small" />,
  },
}
const OrdersTab = () => (
  <Box>
    <Stack sx={{ direction: "row", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
      <Typography sx={{ fontWeight: 800, fontSize: 16 }}>My Orders</Typography>
      <Button component={Link} to="/orders" size="small" variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>
        View All
      </Button>
    </Stack>

    <Stack spacing={2}>
      {orders.map((order) => {
        const st = statusConfig[order.status]
        return (
          <Paper key={order.id} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', transition: '.2s', '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,.08)' } }}>

            {/* Order header */}
            <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
              <Stack sx={{ direction: "row", spacing: 1, alignItems: "center" }}>
                <ShoppingBagOutlinedIcon fontSize="small" color="primary" />
                <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{order.id}</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>· {order.date}</Typography>
              </Stack>
              <Stack sx={{ direction: "row", spacing: 1.5, alignItems: "center" }}>
                <Chip icon={st.icon} label={st.label} color={st.color} size="small" sx={{ fontWeight: 600 }} />
                <Typography sx={{ fontWeight: 800, color: "primary.main" }}>৳{order.total.toLocaleString()}</Typography>
              </Stack>
            </Box>

            {/* Items */}
            <Box sx={{ px: 3, py: 2 }}>
              <Stack spacing={1.5}>
                {order.items.map((item, i) => (
                  <Stack key={i} sx={{ direction: "row", spacing: 1.5, alignItems: "center" }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 52, height: 52, borderRadius: 2, objectFit: 'cover', bgcolor: 'grey.100' }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }} noWrap>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Qty: {item.qty}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                      ৳{(item.price * item.qty).toLocaleString()}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Divider />

            {/* Actions */}
            <Box sx={{ px: 3, py: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button size="small" startIcon={<VisibilityOutlinedIcon />} sx={{ borderRadius: 2, textTransform: 'none', fontSize: 12 }}>
                View Details
              </Button>
              {order.status === 'delivered' && (
                <Button size="small" startIcon={<RateReviewOutlinedIcon />} sx={{ borderRadius: 2, textTransform: 'none', fontSize: 12 }}>
                  Write Review
                </Button>
              )}
              {order.status === 'shipped' && (
                <Button size="small" startIcon={<LocalShippingOutlinedIcon />} sx={{ borderRadius: 2, textTransform: 'none', fontSize: 12 }}>
                  Track Order
                </Button>
              )}
              {order.status === 'pending' && (
                <Button size="small" color="error" sx={{ borderRadius: 2, textTransform: 'none', fontSize: 12 }}>
                  Cancel Order
                </Button>
              )}
            </Box>

          </Paper>
        )
      })}
    </Stack>
  </Box>
)

export default OrdersTab
