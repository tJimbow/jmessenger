import { createRouter, createWebHistory } from 'vue-router'
import MessagesVue from '@/components/MessagesVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'messages',
      component: MessagesVue
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesVue
    }
  ]
})

export default router
