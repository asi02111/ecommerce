import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Typography, Grid } from '@mui/material'
import { EmptyState, Button } from '../components/common'
import CartItemCard    from '../components/cart/CartItemCard'
import CouponBox       from '../components/cart/CouponBox'
import CartOrderSummary from '../components/cart/CartOrderSummary'
import { useCart, useToast } from '../hooks/useStore'

const CartPage = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()
  const { success } = useToast()

  const [couponApplied, setCouponApplied] = useState(false)

  const handleApplyCoupon = (code: string) => {
    const ok = code.toUpperCase() === 'SHOPBD10'
    setCouponApplied(ok)
    if (ok) success('Coupon applied! 10% discount added.')
    return ok
  }

  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0
  const shipping = cartTotal >= 999 ? 0 : 120
  const total    = cartTotal - discount + shipping

  if (cart.length === 0) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Looks like you haven't added anything yet."
          action={<Link to="/"><Button>Continue Shopping</Button></Link>}
        />
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800 }}>Shopping Cart</Typography>
            <Typography variant="body2" color="text.secondary">{cart.length} items in your cart</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="caption"
              onClick={() => { clearCart(); success('Cart cleared') }}
              sx={{ color: 'error.light', cursor: 'pointer', '&:hover': { color: 'error.main' } }}
            >
              Clear all
            </Typography>
            <Typography component={Link} to="/" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>
              ← Continue Shopping
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {cart.map((item, i) => (
                <CartItemCard
                  key={i}
                  item={item}
                  onIncrease={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                  onRemove={() => { removeFromCart(item.product.id, item.size); success(`${item.product.name} removed`) }}
                />
              ))}
              <CouponBox onApply={handleApplyCoupon} />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <CartOrderSummary
              itemCount={cart.reduce((s, i) => s + i.quantity, 0)}
              subtotal={cartTotal}
              discount={discount}
              shipping={shipping}
              total={total}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default CartPage
