import { type RouteConfig, index, route, layout, prefix } from '@react-router/dev/routes'

export default [
  layout('layouts/public.tsx', [
    index('features/home/routes.tsx', { id: 'home' }),
    route('catalog', 'features/catalog/routes.tsx', { id: 'catalog' }),
    route('product/:productId', 'features/product/routes.tsx', { id: 'product' }),
    route('about', 'features/about/routes.tsx', { id: 'about' }),

    ...prefix('auth', [
      route('login', 'features/auth/routes.tsx', { id: 'login' }),
      route('register', 'features/auth/routes.tsx', { id: 'register' })
    ])
  ]),

  layout('layouts/protected.tsx', [
    route('profile', 'features/profile/routes.tsx', { id: 'profile' }),
    route('cart', 'features/cart/routes.tsx', { id: 'cart' })
  ])
] satisfies RouteConfig
