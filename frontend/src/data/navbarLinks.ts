import type { NavLink } from '../types/navbar'

export const topLinks: NavLink[] = [
  { label: 'Track Order',    href: '/track-order' },
  { label: 'Sell on ShopBD', href: '/sell'         },
  { label: 'Help',           href: '/help'         },
]

export const extraLinks: NavLink[] = [
  { label: "🔥 Today's Deals", href: '/deals'        },
  { label: '✨ New Arrivals',  href: '/new-arrivals' },
]
