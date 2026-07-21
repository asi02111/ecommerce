import { Card } from '../../components/common'
import type { CartItem } from '../../types/checkout'

interface Props {
  cartItems: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

const OrderSummary = ({ cartItems, subtotal, shipping, total }: Props) => {
  return (
    <Card padding="md" className="sticky top-24">
      <h2 className="text-sm font-extrabold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        {cartItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="relative">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-10 h-10 rounded-lg object-cover bg-gray-50"
              />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {item.quantity}
              </span>
            </div>
            <p className="flex-1 text-xs text-gray-700 line-clamp-1">{item.product.name}</p>
            <p className="text-xs font-bold text-gray-900">
              ৳{(item.product.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <hr className="border-gray-100 mb-3" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span className="font-medium text-gray-800">৳{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-800'}`}>
            {shipping === 0 ? 'FREE' : `৳${shipping}`}
          </span>
        </div>
        <hr className="border-gray-100" />
        <div className="flex justify-between font-extrabold text-gray-900">
          <span>Total</span>
          <span>৳{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
        {[
          { icon: '🔒', text: 'Secure checkout' },
          { icon: '🔄', text: '7-day easy returns' },
          { icon: '🚚', text: 'Fast delivery' },
        ].map((b, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
            <span>{b.icon}</span><span>{b.text}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default OrderSummary
