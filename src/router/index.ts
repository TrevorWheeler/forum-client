import { useAppStore as app } from '@/stores/app'

import {
  type RouteLocationNormalized,
  type RouteRecordRaw,
  createRouter,
  createWebHistory
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register.vue')
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('@/views/agreement.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/create.vue')
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('@/views/post.vue')
  },
  { path: '/:catchAll(.*)*', name: '404', component: () => import('@/views/unknown.vue') }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  window.document.title = app().siteName as string
  console.log('Route -> ' + from.name?.toString() + ' ' + to.name?.toString())
  if (
    !app().username &&
    to.name?.toString() !== 'agreement' &&
    to.name?.toString() !== 'login' &&
    to.name?.toString() !== 'register'
  ) {
    router.push('/agreement')
  }
  return true
})

export default router
