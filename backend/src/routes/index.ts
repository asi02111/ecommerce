// সব individual route file এখানে একসাথে mount হবে, তারপর app.ts শুধু এই একটা import করবে
import { Router } from 'express'
// import authRoutes from './auth.routes'
// import productRoutes from './product.routes'
// import orderRoutes from './order.routes'
// import cartRoutes from './cart.routes'
// import reviewRoutes from './review.routes'
// import couponRoutes from './coupon.routes'
// import uploadRoutes from './upload.routes'
// import paymentRoutes from './payment.routes'

const router = Router()

// router.use('/auth', authRoutes)
// router.use('/products', productRoutes)
// router.use('/orders', orderRoutes)
// router.use('/cart', cartRoutes)
// router.use('/reviews', reviewRoutes)
// router.use('/coupons', couponRoutes)
// router.use('/upload', uploadRoutes)
// router.use('/payment', paymentRoutes)

export default router
