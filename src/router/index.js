import { createRouter, createWebHistory } from 'vue-router'

//在VueCLI中 @ 表示 src 的别名
import Login from '@/views/login/'
import Home from '@/views/home/'

//路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
