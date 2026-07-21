import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/common'
import type { Address, PaymentMethod } from '../../types/checkout'

interface Props {
  address: Address
  paymentMethod: PaymentMethod
  total: number
  orderNumber: string
}

const paymentLabel: Record<PaymentMethod, string> = {
  bkash: 'bKash',
  nagad: 'Nagad',
  card:  'Credit/Debit Card',
  cod:   'Cash on Delivery',
}

const OrderSuccess = ({ address, paymentMethod, total, orderNumber }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card padding="lg" className="max-w-md w-full text-center">

        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">✅</span>
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-500 text-sm mb-1">
          Thank you, <span className="font-semibold text-gray-800">{address.fullName}</span>!
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Your order <span className="font-mono font-bold text-indigo-600">#{orderNumber}</span> has been placed successfully.
        </p>

        <Card padding="sm" className="text-left mb-6 space-y-2">
          {[
            { label: 'Order ID',  value: `#${orderNumber}` },
            { label: 'Total',     value: `৳${total.toLocaleString()}` },
            { label: 'Payment',   value: paymentLabel[paymentMethod] },
            { label: 'Delivery',  value: '3–5 business days' },
          ].map((row, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-500">{row.label}</span>
              <span className="font-semibold text-gray-800">{row.value}</span>
            </div>
          ))}
        </Card>

        <div className="flex gap-3">
          <Link to="/" className="flex-1">
            <Button fullWidth variant="outline">Continue Shopping</Button>
          </Link>
          <Link to="/orders" className="flex-1">
            <Button fullWidth>Track Order</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default OrderSuccess
