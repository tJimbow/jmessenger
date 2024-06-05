import { createRouter, createWebHistory } from 'vue-router'
import JMessenger from '@/components/JMessenger.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'j-messenger',
      component: JMessenger
    },
  ]
})

export default router
