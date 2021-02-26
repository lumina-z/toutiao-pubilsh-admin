import { createRouter, createWebHistory } from 'vue-router'

//在VueCLI中 @ 表示 src 的别名
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'

//路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '', //path为空,会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//路由导航守卫,拦截页面
/**
 * to: 要去的页面的信息
 * from:来自那的路由信息
 * next: 放行方法
*/
router.beforeEach((to,from,next) =>{
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }

})

export default router
