import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/common'
import type { Address, PaymentMethod, CartItem } from '../../types/checkout'

interface Props {
  address: Address
  paymentMethod: PaymentMethod
  cartItems: CartItem[]
  total: number
  onBack: () => void
  onPlaceOrder: () => void
}

const paymentLabel: Record<PaymentMethod, string> = {
  bkash: '📱 bKash',
  nagad: '📱 Nagad',
  card:  '💳 Credit/Debit Card',
  cod:   '💵 Cash on Delivery',
}

const OrderReview = ({ address, paymentMethod, cartItems, total, onBack, onPlaceOrder }: Props) => {
  return (
    <div className="space-y-4">

      {/* Address */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-gray-900">📍 Delivery Address</h3>
          <button onClick={onBack} className="text-xs text-indigo-600 hover:underline">Edit</button>
        </div>
        <p className="text-sm font-semibold text-gray-800">{address.fullName}</p>
        <p className="text-sm text-gray-500">{address.phone} · {address.email}</p>
        <p className="text-sm text-gray-500">{address.address}, {address.district}, {address.division}</p>
      </Card>

      {/* Payment */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-extrabold text-gray-900">💳 Payment</h3>
          <button onClick={onBack} className="text-xs text-indigo-600 hover:underline">Edit</button>
        </div>
        <p className="text-sm font-medium text-gray-700">{paymentLabel[paymentMethod]}</p>
      </Card>

      {/* Items */}
      <Card padding="md">
        <h3 className="text-sm font-extrabold text-gray-900 mb-4">🛍️ Order Items</h3>
        <div className="space-y-3">
          {cartItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-14 h-14 rounded-xl object-cover bg-gray-50"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.product.name}</p>
                <p className="text-xs text-gray-500">Size: {item.size} · Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-gray-900">
                ৳{(item.product.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Button fullWidth variant="success" size="lg" onClick={onPlaceOrder}>
        ✅ Place Order — ৳{total.toLocaleString()}
      </Button>

      <p className="text-center text-xs text-gray-400">
        By placing this order you agree to our{' '}
        <Link to="/terms" className="text-indigo-500 hover:underline">Terms & Conditions</Link>
      </p>
    </div>
  )
}

export default OrderReview
