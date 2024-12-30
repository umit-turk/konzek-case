export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  CART: '/cart',
  ORDERS: '/orders',
  PRODUCT: {
    LIST: '/',
    DETAIL: '/product/:id',
    CREATE: (id: string) => `/product/${id}`,
  },
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.ORDERS,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
] as const; 