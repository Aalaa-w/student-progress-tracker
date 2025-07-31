import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Students from '@/views/Students.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/dashboard', component: Dashboard },
    { path: '/Students', component: Students },
  ],
})
// 🔒 Navigation Guard
router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')

  if (to.path !== '/login' && (!username || !role)) {
    next('/login')
  } else {
    next()
  }
})

export default router
