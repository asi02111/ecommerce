const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">

      {/* Newsletter */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-xl font-bold">Get exclusive deals in your inbox</h3>
            <p className="text-indigo-200 text-sm mt-1">Subscribe and save up to 20% on your first order</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-72 px-4 py-2.5 rounded-xl text-sm text-gray-800 outline-none"
            />
            <button className="bg-white text-indigo-600 font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-extrabold text-white mb-3">
            Shop<span className="text-indigo-400">BD</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Bangladesh's most trusted online marketplace. Shop from thousands of products with guaranteed quality.
          </p>
          <div className="flex gap-3">
            {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
              <button key={i} className="w-9 h-9 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors text-sm">
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: "Today's Deals", href: '/deals' },
              { label: 'New Arrivals', href: '/new-arrivals' },
              { label: 'Sell on ShopBD', href: '/sell' },
            ].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-white font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            {[
              { label: 'Track My Order', href: '/track-order' },
              { label: 'Returns & Refunds', href: '/returns' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Help Center', href: '/help' },
              { label: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            {[
              { icon: '📍', text: 'Gulshan-2, Dhaka-1212, Bangladesh' },
              { icon: '📞', text: '+880 1700-000000' },
              { icon: '✉️', text: 'support@shopbd.com' },
              { icon: '🕐', text: 'Sat–Thu: 9AM – 9PM' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-base mt-0.5">{item.icon}</span>
                <span className="text-sm text-gray-400">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2025 ShopBD. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
          {/* Payment Icons */}
          <div className="flex gap-2 text-xs">
            {['💳 Visa', '💳 Mastercard', '🏦 bKash', '🏦 Nagad'].map((p) => (
              <span key={p} className="bg-gray-800 px-2 py-1 rounded text-gray-400">{p}</span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer