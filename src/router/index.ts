import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Simulator from '@/views/Simulator.vue'
// import Simulator from '@/views/Simulator.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Simulator',
    component: Simulator
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
