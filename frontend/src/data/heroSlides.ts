export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  badge: string
  buttonText: string
  buttonLink: string
  overlay: string   // dark gradient overlay over image
  accent: string    // badge text color
  image: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Summer Collection 2025",
    subtitle: "Up to 50% off on all Men's Fashion",
    badge: "🔥 Limited Time Deal",
    buttonText: "Shop Now",
    buttonLink: "/men",
    overlay: 'linear-gradient(90deg, rgba(30,27,75,.85), rgba(30,27,75,.55))',
    accent: '#FDE68A',
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80",
  },
  {
    id: 2,
    title: "New Electronics Arrivals",
    subtitle: "Latest Smartphones & Laptops at Best Price",
    badge: "✨ Just Arrived",
    buttonText: "Explore Now",
    buttonLink: "/electronics",
    overlay: 'linear-gradient(90deg, rgba(15,23,42,.9), rgba(15,23,42,.6))',
    accent: '#67E8F9',
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80",
  },
  {
    id: 3,
    title: "Women's Fashion Week",
    subtitle: "Exclusive dresses, sarees & more",
    badge: "💜 Editor's Pick",
    buttonText: "Discover More",
    buttonLink: "/women",
    overlay: 'linear-gradient(90deg, rgba(76,29,63,.85), rgba(159,18,57,.55))',
    accent: '#FDE68A',
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  },
  {
    id: 4,
    title: "Home & Living Sale",
    subtitle: "Transform your space — up to 40% off",
    badge: "🏠 Weekend Special",
    buttonText: "Shop Home",
    buttonLink: "/home",
    overlay: 'linear-gradient(90deg, rgba(6,78,59,.85), rgba(6,95,70,.55))',
    accent: '#FDE68A',
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80",
  },
]

export interface SideBanner {
  title: string
  subtitle: string
  badge: string
  link: string
  linkText: string
  overlay: string
  image: string
}

export const sideBanners: SideBanner[] = [
  {
    title: 'Sports & Fitness Gear',
    subtitle: 'Starting from ৳299',
    badge: 'New Season',
    link: '/sports',
    linkText: 'Shop Sports →',
    overlay: 'linear-gradient(135deg, rgba(194,65,12,.75), rgba(127,29,29,.8))',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80',
  },
  {
    title: 'Accessories & Jewelry',
    subtitle: 'Up to 60% off today',
    badge: 'Flash Sale',
    link: '/women/jewelry',
    linkText: 'Shop Now →',
    overlay: 'linear-gradient(135deg, rgba(109,40,217,.75), rgba(76,29,149,.8))',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
  },
]

export const featureBadges = [
  { icon: '🚚', title: 'Free Delivery',   desc: 'On orders over ৳999'       },
  { icon: '🔄', title: 'Easy Returns',    desc: '7-day return policy'       },
  { icon: '🔒', title: 'Secure Payment',  desc: '100% protected checkout'   },
  { icon: '🎧', title: '24/7 Support',    desc: 'Always here to help'       },
]
