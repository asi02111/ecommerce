export interface NavLink{
    label: string;
    href: string;
}

export interface Category{
    label: string;
    href: string;
    subcategories: NavLink[];
}

export interface CartItem{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Slide {
  id: number
  title: string
  subtitle: string
  badge: string
  buttonText: string
  buttonLink: string
  bg: string
  accent: string
  emoji: string
  image: string 
}

export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  image: string
  category: string
  badge?: string        // optional — "New", "Hot", "Sale"
  inStock: boolean
}