import { Link } from 'react-router-dom'
import { Button, Card, Badge, EmptyState } from '../components/common'
import { useAuth } from '../hooks/useStore'

// Demo orders data — পরে backend থেকে আসবে
const demoOrders = [
  {
    id: 'ORD-12345',
    date: '20 Jan 2025',
    total: 4750,
    status: 'delivered',
    items: [
      { name: 'Classic White Oxford Shirt', qty: 2, price: 850, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&q=80' },
      { name: 'Wireless Earbuds Pro',       qty: 1, price: 2800, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80' },
    ],
  },
  {
    id: 'ORD-12289',
    date: '12 Jan 2025',
    total: 3200,
    status: 'shipped',
    items: [
      { name: 'Running Shoes X200', qty: 1, price: 3200, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80' },
    ],
  },
  {
    id: 'ORD-12100',
    date: '5 Jan 2025',
    total: 1100,
    status: 'pending',
    items: [
      { name: 'Floral Summer Dress', qty: 1, price: 1100, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&q=80' },
    ],
  },
]

const statusConfig: Record<string, { label: string; variant: 'green' | 'indigo' | 'orange' | 'gray' }> = {
  delivered: { label: '✅ Delivered',    variant: 'green'  },
  shipped:   { label: '🚚 Shipped',      variant: 'indigo' },
  pending:   { label: '⏳ Pending',      variant: 'orange' },
  cancelled: { label: '❌ Cancelled',    variant: 'gray'   },
}

const OrdersPage = () => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon="🔐"
          title="Please login to view orders"
          description="You need to be logged in to see your order history."
          action={<Link to="/login"><Button>Login</Button></Link>}
        />
      </div>
    )
  }

  if (demoOrders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon="📦"
          title="No orders yet"
          description="You haven't placed any orders yet. Start shopping!"
          action={<Link to="/"><Button>Start Shopping</Button></Link>}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">My Orders</h1>
            <p className="text-sm text-gray-500 mt-1">{demoOrders.length} orders placed</p>
          </div>
          <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">← Continue Shopping</Link>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {demoOrders.map((order) => {
            const status = statusConfig[order.status]
            return (
              <Card key={order.id} padding="md" hover>

                {/* Order Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Placed on {order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={status.variant} dot>{status.label}</Badge>
                    <span className="text-sm font-extrabold text-gray-900">৳{order.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">৳{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  {order.status === 'delivered' && (
                    <Button size="sm" variant="outline">⭐ Write Review</Button>
                  )}
                  {order.status === 'shipped' && (
                    <Button size="sm" variant="outline">📍 Track Order</Button>
                  )}
                  {order.status === 'pending' && (
                    <Button size="sm" variant="danger">Cancel Order</Button>
                  )}
                  <Button size="sm" variant="ghost">View Details</Button>
                </div>

              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
