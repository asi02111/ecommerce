import type { Category } from '../types/navbar'

export const navbarCategories: Category[] = [
  {
    label: 'Men', href: '/men',
    subcategories: [
      { label: 'T-Shirts', href: '/men/tshirts' },
      { label: 'Shirts',   href: '/men/shirts'   },
      { label: 'Pants',    href: '/men/pants'    },
      { label: 'Shoes',    href: '/men/shoes'    },
      { label: 'Watches',  href: '/men/watches'  },
      { label: 'Bags',     href: '/men/bags'     },
    ],
  },
  {
    label: 'Women', href: '/women',
    subcategories: [
      { label: 'Dresses',  href: '/women/dresses'  },
      { label: 'Tops',     href: '/women/tops'     },
      { label: 'Saree',    href: '/women/saree'    },
      { label: 'Handbags', href: '/women/handbags' },
      { label: 'Shoes',    href: '/women/shoes'    },
      { label: 'Jewelry',  href: '/women/jewelry'  },
    ],
  },
  {
    label: 'Electronics', href: '/electronics',
    subcategories: [
      { label: 'Smartphones', href: '/electronics/smartphones' },
      { label: 'Laptops',     href: '/electronics/laptops'     },
      { label: 'Headphones',  href: '/electronics/headphones'  },
      { label: 'Cameras',     href: '/electronics/cameras'     },
      { label: 'Smart Watch', href: '/electronics/smartwatch'  },
      { label: 'Accessories', href: '/electronics/accessories' },
    ],
  },
  {
    label: 'Home & Living', href: '/home',
    subcategories: [
      { label: 'Furniture', href: '/home/furniture' },
      { label: 'Kitchen',   href: '/home/kitchen'   },
      { label: 'Bedding',   href: '/home/bedding'   },
      { label: 'Lighting',  href: '/home/lighting'  },
      { label: 'Decor',     href: '/home/decor'     },
      { label: 'Storage',   href: '/home/storage'   },
    ],
  },
  {
    label: 'Sports', href: '/sports',
    subcategories: [
      { label: 'Cricket',    href: '/sports/cricket'    },
      { label: 'Football',   href: '/sports/football'   },
      { label: 'Gym',        href: '/sports/gym'        },
      { label: 'Cycling',    href: '/sports/cycling'    },
      { label: 'Outdoor',    href: '/sports/outdoor'    },
      { label: 'Sportswear', href: '/sports/sportswear' },
    ],
  },
]
