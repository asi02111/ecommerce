import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Address, AddressErrors, PaymentMethod, CartItem } from '../types/checkout'
import { useCart }  from '../hooks/useStore'
import { useToast } from '../hooks/useStore'

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

  const [step,         setStep]         = useState<1 | 2 | 3>(1)
  const [orderPlaced,  setOrderPlaced]  = useState(false)
  const [orderNumber]                   = useState(`${Math.floor(Math.random() * 90000) + 10000}`)
  const [address,      setAddress]      = useState<Address>({ fullName: '', phone: '', email: '', division: '', district: '', address: '', postalCode: '' })
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({})
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash')

  const shipping = cartTotal >= 999 ? 0 : 120
  const total    = cartTotal + shipping

  // Cart টা checkout এর জন্য CartItem format এ convert করা
  const cartItems: CartItem[] = cart.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    size: item.size,
  }))

  const handleAddressNext = () => {
    const errors = validateAddress(address)
    if (Object.keys(errors).length > 0) { setAddressErrors(errors); return }
    setAddressErrors({})
    setStep(2)
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    clearCart() // order হলে cart clear করো
    success('Order placed successfully! 🎉')
  }

  // Empty cart
  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Add items to cart before checkout."
          action={<Link to="/"><Button>Go Shopping</Button></Link>}
        />
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <OrderSuccess
        address={address}
        paymentMethod={paymentMethod}
        total={total}
        orderNumber={orderNumber}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">

        <div className="flex items-center gap-3 mb-6">
          <Link to="/cart" className="text-sm text-indigo-600 hover:text-indigo-700">← Back to Cart</Link>
          <span className="text-gray-300">|</span>
          <h1 className="text-xl font-extrabold text-gray-900">Checkout</h1>
        </div>

        <StepIndicator currentStep={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {step === 1 && (
              <AddressForm
                address={address}
                errors={addressErrors}
                onChange={setAddress}
                onNext={handleAddressNext}
              />
            )}
            {step === 2 && (
              <PaymentForm
                paymentMethod={paymentMethod}
                total={total}
                onMethodChange={setPaymentMethod}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <OrderReview
                address={address}
                paymentMethod={paymentMethod}
                cartItems={cartItems}
                total={total}
                onBack={() => setStep(2)}
                onPlaceOrder={handlePlaceOrder}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              subtotal={cartTotal}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
