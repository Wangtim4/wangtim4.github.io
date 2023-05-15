import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 前台
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/UserProduct.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/ProductPage.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartList.vue'),
      },
      {
        path: 'order',
        component: () => import('../views/Order.vue'),
      },
      {
        path: 'checkout',
        component: () => import('../views/UserCheck.vue'),
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckout.vue'),
      },
    ]
  },
  // 後台
  {
    path: '/login',
    component: () => import('../views/backend/LoginA.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/backend/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/ProductList.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/OrdersList.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/CouponsList.vue')
      },

    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
})

export default router
