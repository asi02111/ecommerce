import { useState } from 'react'
import { Button, Input, Card } from '../../components/common'
import type { PaymentMethod, CardInfo } from '../../types/checkout'

interface Props {
  paymentMethod: PaymentMethod
  total: number
  onMethodChange: (method: PaymentMethod) => void
  onNext: () => void
  onBack: () => void
}

const paymentOptions = [
  { id: 'bkash', label: 'bKash',            icon: '📱', color: 'text-pink-600'   },
  { id: 'nagad', label: 'Nagad',            icon: '📱', color: 'text-orange-500' },
  { id: 'card',  label: 'Card',             icon: '💳', color: 'text-blue-600'   },
  { id: 'cod',   label: 'Cash on Delivery', icon: '💵', color: 'text-green-600'  },
] as const

const PaymentForm = ({ paymentMethod, total, onMethodChange, onNext, onBack }: Props) => {
  const [cardInfo, setCardInfo] = useState<CardInfo>({ number: '', name: '', expiry: '', cvv: '' })

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-base font-extrabold text-gray-900 mb-5">💳 Payment Method</h2>

      {/* Method Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {paymentOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onMethodChange(option.id)}
            className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
              paymentMethod === option.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-2xl">{option.icon}</span>
            <span className={`text-xs font-semibold ${option.color}`}>{option.label}</span>
          </button>
        ))}
      </div>

      {/* bKash / Nagad */}
      {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
        <Card padding="md" className="bg-pink-50 border-pink-200 mb-4">
          <p className="text-sm font-semibold text-pink-700 mb-2">
            📱 {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Payment
          </p>
          <p className="text-sm text-pink-600">Send to: <span className="font-bold">01700-000000</span></p>
          <p className="text-sm text-pink-600 mt-1">Amount: <span className="font-bold">৳{total.toLocaleString()}</span></p>
          <Input
            className="mt-3"
            placeholder="Enter Transaction ID"
          />
        </Card>
      )}

      {/* Card */}
      {paymentMethod === 'card' && (
        <div className="space-y-3 mb-4">
          <Input
            label="Card Number"
            value={cardInfo.number}
            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          <Input
            label="Cardholder Name"
            value={cardInfo.name}
            onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
            placeholder="RAHIM KHAN"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Expiry"
              value={cardInfo.expiry}
              onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
              placeholder="MM / YY"
              maxLength={7}
            />
            <Input
              label="CVV"
              type="password"
              value={cardInfo.cvv}
              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
              placeholder="•••"
              maxLength={4}
            />
          </div>
        </div>
      )}

      {/* COD */}
      {paymentMethod === 'cod' && (
        <Card padding="md" className="bg-green-50 border-green-200 mb-4">
          <p className="text-sm font-semibold text-green-700">💵 Cash on Delivery</p>
          <p className="text-sm text-green-600 mt-1">
            Pay ৳{total.toLocaleString()} when your order arrives. Available inside Dhaka only.
          </p>
        </Card>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button fullWidth onClick={onNext}>Review Order →</Button>
      </div>
    </div>
  )
}

export default PaymentForm
