import { useState, useEffect } from 'react'
import type { Slide } from '../../types'

const slides: Slide[] = [
  {
    id: 1,
    title: "Summer Collection 2025",
    subtitle: "Up to 50% off on all Men's Fashion",
    badge: "🔥 Limited Time Deal",
    buttonText: "Shop Now",
    buttonLink: "/men",
    bg: "from-indigo-900/70 to-indigo-900/90",
    accent: "text-yellow-300",
    emoji: "👕",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80",
  },
  {
    id: 2,
    title: "New Electronics Arrivals",
    subtitle: "Latest Smartphones & Laptops at Best Price",
    badge: "✨ Just Arrived",
    buttonText: "Explore Now",
    buttonLink: "/electronics",
    bg: "from-slate-900/80 to-slate-900/95",
    accent: "text-cyan-300",
    emoji: "📱",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80",
  },
  {
    id: 3,
    title: "Women's Fashion Week",
    subtitle: "Exclusive dresses, sarees & more",
    badge: "💜 Editor's Pick",
    buttonText: "Discover More",
    buttonLink: "/women",
    bg: "from-rose-900/70 to-pink-900/90",
    accent: "text-yellow-200",
    emoji: "👗",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  },
  {
    id: 4,
    title: "Home & Living Sale",
    subtitle: "Transform your space — up to 40% off",
    badge: "🏠 Weekend Special",
    buttonText: "Shop Home",
    buttonLink: "/home",
    bg: "from-teal-900/70 to-emerald-900/90",
    accent: "text-yellow-300",
    emoji: "🛋️",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80",
  },
]

const HeroBanner = () => {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [current])

  const goTo = (index: number) => {
    if (animating || index === current) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 500)
  }

  const slide = slides[current]

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4">

          {/* Main Carousel */}
          <div className="relative flex-1 rounded-2xl overflow-hidden min-h-[340px]">

            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Dark gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg}`} />

            {/* Text Content */}
            <div className="relative z-10 flex flex-col justify-center h-full p-10 max-w-lg">
              <span className={`text-sm font-semibold mb-3 ${slide.accent}`}>
                {slide.badge}
              </span>
              <h2
                className={`text-4xl font-extrabold text-white leading-tight mb-3 transition-all duration-500 ${
                  animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                }`}
              >
                {slide.title}
              </h2>
              <p
                className={`text-white/80 text-lg mb-6 transition-all duration-500 delay-75 ${
                  animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                }`}
              >
                {slide.subtitle}
              </p>
              <div className="flex gap-3">
                <a
                  href={slide.buttonLink}
                  className="inline-block bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-sm"
                >
                  {slide.buttonText} →
                </a>
                <a
                  href="/deals"
                  className="inline-block border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm"
                >
                  View All Deals
                </a>
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-5 left-10 flex gap-2 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'bg-white w-6 h-2'
                      : 'bg-white/40 w-2 h-2 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={() => goTo((current - 1 + slides.length) % slides.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors backdrop-blur-sm"
            >
              ‹
            </button>
            <button
              onClick={() => goTo((current + 1) % slides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors backdrop-blur-sm"
            >
              ›
            </button>
          </div>

          {/* Side Banners — desktop only */}
          <div className="hidden lg:flex flex-col gap-4 w-64">

            <div className="flex-1 relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80"
                alt="Sports"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/70 to-red-800/80" />
              <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-bold text-orange-100 bg-white/20 px-2 py-0.5 rounded-full">New Season</span>
                  <h3 className="text-white font-bold text-lg mt-2 leading-snug">Sports & Fitness Gear</h3>
                  <p className="text-white/80 text-xs mt-1">Starting from ৳299</p>
                </div>
                <a href="/sports" className="text-xs font-bold text-white underline underline-offset-2">Shop Sports →</a>
              </div>
            </div>

            <div className="flex-1 relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80"
                alt="Jewelry"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/70 to-purple-900/80" />
              <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-bold text-purple-100 bg-white/20 px-2 py-0.5 rounded-full">Flash Sale</span>
                  <h3 className="text-white font-bold text-lg mt-2 leading-snug">Accessories & Jewelry</h3>
                  <p className="text-white/80 text-xs mt-1">Up to 60% off today</p>
                </div>
                <a href="/women/jewelry" className="text-xs font-bold text-white underline underline-offset-2">Shop Now →</a>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { icon: '🚚', title: 'Free Delivery', desc: 'On orders over ৳999' },
            { icon: '🔄', title: 'Easy Returns', desc: '7-day return policy' },
            { icon: '🔒', title: 'Secure Payment', desc: '100% protected checkout' },
            { icon: '🎧', title: '24/7 Support', desc: 'Always here to help' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HeroBanner