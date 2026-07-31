import type { NavLink } from '../types/navbar'

export const quickLinks: NavLink[] = [
  { label: 'Home',            href: '/'             },
  { label: 'Products',        href: '/products'     },
  { label: "Today's Deals",   href: '/deals'        },
  { label: 'New Arrivals',    href: '/new-arrivals' },
  { label: 'Sell on ShopBD',  href: '/sell'         },
]

export const customerServiceLinks: NavLink[] = [
  { label: 'Track My Order',    href: '/track-order' },
  { label: 'Returns & Refunds', href: '/returns'      },
  { label: 'FAQ',                href: '/faq'         },
  { label: 'Help Center',        href: '/help'        },
  { label: 'Contact Us',         href: '/contact'     },
]

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy',   href: '/privacy' },
  { label: 'Terms of Service', href: '/terms'   },
  { label: 'Cookie Policy',    href: '/cookies' },
]

export const contactInfo = [
  { icon: '📍', text: 'Gulshan-2, Dhaka-1212, Bangladesh' },
  { icon: '📞', text: '+880 1700-000000'                  },
  { icon: '✉️', text: 'support@shopbd.com'                },
  { icon: '🕐', text: 'Sat–Thu: 9AM – 9PM'                },
]

export const socialLinks = [
  { icon: '📘', label: 'Facebook',  href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '🐦', label: 'Twitter',   href: '#' },
  { icon: '▶️', label: 'YouTube',   href: '#' },
]

export const paymentMethods = ['💳 Visa', '💳 Mastercard', '🏦 bKash', '🏦 Nagad']
