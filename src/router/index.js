import { createRouter, createWebHistory } from 'vue-router'

//在VueCLI中 @ 表示 src 的别名
import Login from '@/views/login'

//路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
