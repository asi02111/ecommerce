import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/products'

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const useProductDetail = () => {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  const [quantity,     setQuantity]     = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [activeTab,    setActiveTab]    = useState(0) // 0=description 1=reviews 2=shipping

  const increaseQty = () => setQuantity((q) => q + 1)
  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1))

  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : []

  const discount = product
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return {
    product, quantity, selectedSize, activeTab, relatedProducts, discount,
    setQuantity, setSelectedSize, setActiveTab, increaseQty, decreaseQty,
  }
}
