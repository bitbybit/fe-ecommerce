import { type RouteConfig, index, route, layout, prefix } from '@react-router/dev/routes'

export default [
  layout('layouts/public.tsx', [
    index('pages/home/index.tsx'),
    route('catalog', 'pages/catalog/index.tsx'),
    route('product/:productId', 'pages/product/index.tsx'),
    route('about', 'pages/about/index.tsx'),

    ...prefix('auth', [route('login', 'pages/login/index.tsx'), route('register', 'pages/register/index.tsx')])
  ]),

  layout('layouts/protected.tsx', [route('profile', 'pages/profile/index.tsx'), route('cart', 'pages/cart/index.tsx')])
] satisfies RouteConfig
