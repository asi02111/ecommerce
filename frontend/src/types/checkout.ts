import type { Product } from './index'

export interface Address {
  fullName: string
  phone: string
  email: string
  division: string
  district: string
  address: string
  postalCode: string
}

export type AddressErrors = Partial<Address>

export type PaymentMethod = 'bkash' | 'nagad' | 'card' | 'cod'

export interface CardInfo {
  number: string
  name: string
  expiry: string
  cvv: string
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
}
