import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Card, EmptyState } from '../components/common'
import { useCart }  from '../hooks/useStore'
import { useToast } from '../hooks/useStore'

const CartPage = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()
  const { success } = useToast()

  const [coupon,        setCoupon]        = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError,   setCouponError]   = useState('')

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'SHOPBD10') {
      setCouponApplied(true)
      setCouponError('')
      success('Coupon applied! 10% discount added.')
    } else {
      setCouponError('Invalid coupon code')
      setCouponApplied(false)
    }
  }

  const handleRemove = (productId: number, size: string, name: string) => {
    removeFromCart(productId, size)
    success(`${name} removed from cart`)
  }

  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0
  const shipping  = cartTotal >= 999 ? 0 : 120
  const total     = cartTotal - discount + shipping

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Looks like you haven't added anything yet."
          action={
            <Link to="/"><Button>Continue Shopping</Button></Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Shopping Cart</h1>
            <p className="text-sm text-gray-500 mt-1">{cart.length} items in your cart</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { clearCart(); success('Cart cleared') }} className="text-xs text-red-400 hover:text-red-600 transition-colors">
              Clear all
            </button>
            <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">← Continue Shopping</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => {
              const itemDiscount = Math.round(
                ((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100
              )
              return (
                <Card key={index} padding="md">
                  <div className="flex gap-4">
                    <Link to={`/product/${item.product.id}`} className="shrink-0">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs text-indigo-500 font-medium">{item.product.category}</p>
                          <Link to={`/product/${item.product.id}`}>
                            <h3 className="text-sm font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">
                            Size: <span className="font-medium text-gray-700">{item.size}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.product.id, item.size, item.product.name)}
                          className="text-gray-400 hover:text-red-500 transition-colors shrink-0 p-1"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-gray-900">৳{item.product.price.toLocaleString()}</span>
                          {itemDiscount > 0 && (
                            <>
                              <span className="text-xs text-gray-400 line-through">৳{item.product.originalPrice.toLocaleString()}</span>
                              <span className="text-xs bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">-{itemDiscount}%</span>
                            </>
                          )}
                        </div>

                        {/* Qty controls */}
                        <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 text-gray-600 hover:bg-gray-50 font-bold transition-colors"
                          >−</button>
                          <span className="w-8 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 text-gray-600 hover:bg-gray-50 font-bold transition-colors"
                          >+</button>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Item total: <span className="font-bold text-gray-800">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}

            {/* Coupon */}
            <Card padding="md">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">🎟️ Have a coupon?</h3>
              <div className="flex gap-2">
                <Input
                  value={coupon}
                  onChange={(e) => { setCoupon(e.target.value); setCouponError('') }}
                  placeholder="Enter coupon code"
                  error={couponError}
                />
                <Button onClick={applyCoupon} className="shrink-0">Apply</Button>
              </div>
              {couponApplied && (
                <p className="text-green-600 text-xs font-medium mt-2">✓ Coupon applied! You save ৳{discount.toLocaleString()}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">Try: <span className="font-mono font-bold">SHOPBD10</span> for 10% off</p>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card padding="md" className="sticky top-24">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-semibold text-gray-800">৳{cartTotal.toLocaleString()}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (SHOPBD10)</span>
                    <span className="font-semibold">-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                    {shipping === 0 ? 'FREE' : `৳${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
                    Add ৳{(999 - cartTotal).toLocaleString()} more for free shipping
                  </p>
                )}
                <hr className="border-gray-100" />
                <div className="flex justify-between text-base font-extrabold text-gray-900">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button fullWidth className="mt-5">Proceed to Checkout →</Button>
              </Link>

              <div className="mt-4 flex flex-col gap-2">
                {[
                  { icon: '🔒', text: '100% Secure Checkout' },
                  { icon: '🔄', text: '7-day easy returns' },
                  { icon: '🚚', text: 'Fast delivery guaranteed' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{item.icon}</span><span>{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
