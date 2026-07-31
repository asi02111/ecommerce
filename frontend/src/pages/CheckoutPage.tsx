import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Typography, Grid } from '@mui/material'
import type { Address, AddressErrors, PaymentMethod, CartItem } from '../types/checkout'
import { useCart, useToast } from '../hooks/useStore'

import StepIndicator from '../components/checkout/StepIndicator'
import AddressForm   from '../components/checkout/AddressForm'
import PaymentForm   from '../components/checkout/PaymentForm'
import OrderReview   from '../components/checkout/OrderReview'
import OrderSummary  from '../components/checkout/OrderSummary'
import OrderSuccess  from '../components/checkout/OrderSuccess'
import { EmptyState, Button } from '../components/common'

const validateAddress = (address: Address): AddressErrors => {
  const errors: AddressErrors = {}
  if (!address.fullName.trim()) errors.fullName = 'Full name is required'
  if (!address.phone || !/^01[3-9]\d{8}$/.test(address.phone)) errors.phone = 'Valid BD phone required'
  if (!address.email || !/\S+@\S+\.\S+/.test(address.email)) errors.email = 'Valid email required'
  if (!address.division) errors.division = 'Select a division'
  if (!address.district.trim()) errors.district = 'District is required'
  if (!address.address.trim()) errors.address = 'Address is required'
  return errors
}

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart()
  const { success } = useToast()

  const [step,          setStep]          = useState<1 | 2 | 3>(1)
  const [orderPlaced,   setOrderPlaced]   = useState(false)
  const [orderNumber]                     = useState(`${Math.floor(Math.random() * 90000) + 10000}`)
  const [address,       setAddress]       = useState<Address>({ fullName: '', phone: '', email: '', division: '', district: '', address: '', postalCode: '' })
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({})
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash')

  const shipping = cartTotal >= 999 ? 0 : 120
  const total    = cartTotal + shipping

  const cartItems: CartItem[] = cart.map((item) => ({ product: item.product, quantity: item.quantity, size: item.size }))

  const handleAddressNext = () => {
    const errors = validateAddress(address)
    if (Object.keys(errors).length > 0) { setAddressErrors(errors); return }
    setAddressErrors({})
    setStep(2)
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    clearCart()
    success('Order placed successfully! 🎉')
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EmptyState icon="🛒" title="Your cart is empty" description="Add items to cart before checkout." action={<Link to="/"><Button>Go Shopping</Button></Link>} />
      </Box>
    )
  }

  if (orderPlaced) {
    return <OrderSuccess address={address} paymentMethod={paymentMethod} total={total} orderNumber={orderNumber} />
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Typography component={Link} to="/cart" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>← Back to Cart</Typography>
          <Typography color="text.disabled">|</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Checkout</Typography>
        </Box>

        <StepIndicator currentStep={step} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            {step === 1 && <AddressForm address={address} errors={addressErrors} onChange={setAddress} onNext={handleAddressNext} />}
            {step === 2 && <PaymentForm paymentMethod={paymentMethod} total={total} onMethodChange={setPaymentMethod} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <OrderReview address={address} paymentMethod={paymentMethod} cartItems={cartItems} total={total} onBack={() => setStep(2)} onPlaceOrder={handlePlaceOrder} />}
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <OrderSummary cartItems={cartItems} subtotal={cartTotal} shipping={shipping} total={total} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default CheckoutPage
