import { Button, Input, Select } from '../../components/common'
import type { Address, AddressErrors } from '../../types/checkout'

const divisionOptions = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna',
  'Sylhet', 'Barisal', 'Rangpur', 'Mymensingh',
].map((d) => ({ value: d, label: d }))

interface Props {
  address: Address
  errors: AddressErrors
  onChange: (address: Address) => void
  onNext: () => void
}

const AddressForm = ({ address, errors, onChange, onNext }: Props) => {
  const update = (field: keyof Address, value: string) =>
    onChange({ ...address, [field]: value })

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-base font-extrabold text-gray-900 mb-5">📍 Delivery Address</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Full Name"
            value={address.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder="Rahim Khan"
            error={errors.fullName}
          />
        </div>

        <Input
          label="Phone"
          type="tel"
          value={address.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="01XXXXXXXXX"
          error={errors.phone}
        />

        <Input
          label="Email"
          type="email"
          value={address.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />

        <Select
          label="Division"
          value={address.division}
          onChange={(e) => update('division', e.target.value)}
          options={divisionOptions}
          placeholder="Select Division"
          error={errors.division}
        />

        <Input
          label="District"
          value={address.district}
          onChange={(e) => update('district', e.target.value)}
          placeholder="e.g. Dhaka"
          error={errors.district}
        />

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Street Address</label>
          <textarea
            value={address.address}
            onChange={(e) => update('address', e.target.value)}
            placeholder="House no, road, area..."
            rows={2}
            className={`w-full border-2 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none ${
              errors.address
                ? 'border-red-400 focus:border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-indigo-500'
            }`}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <Input
          label="Postal Code (optional)"
          value={address.postalCode}
          onChange={(e) => update('postalCode', e.target.value)}
          placeholder="1200"
        />
      </div>

      <Button fullWidth className="mt-6" onClick={onNext}>
        Continue to Payment →
      </Button>
    </div>
  )
}

export default AddressForm
