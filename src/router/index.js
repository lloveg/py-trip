import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/home',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: '/favor',
      component: () => import('@/views/favor/favor.vue')
    },
    {
      path: '/order',
      component: () => import('@/views/order/order.vue')
    },
    {
      path: '/message',
      component: () => import('@/views/message/message.vue'),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: '/city',
      component: () => import('@/views/city/city.vue'),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: '/search',
      component: () => import('@/views/search/search.vue'),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: '/hotel',
      component: () => import('@/views/hotel/hotel.vue'),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: '/detail/:id',
      component: () => import('@/views/detail/detail.vue'),
    },
  ]
})

export default router
